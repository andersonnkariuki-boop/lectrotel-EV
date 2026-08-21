import { Component, OnInit, OnDestroy, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule, NavController } from "@ionic/angular";
import { BarcodeScanner } from "@capacitor-community/barcode-scanner";
import { SessionService } from "../services/session.service";
import { PillarService } from "../services/pillar.service";
import { ToastService } from "../services/toast.service";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-qr-scan",
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: "qr-scan.page.html",
  styleUrls: ["qr-scan.page.scss"],
})
export class QrScanPage implements OnInit, OnDestroy {
  scanning = false;
  scanResult: any = null;
  pillarDetails: any = null;
  walletBalance = 0;
  isProcessing = false;
  showPillarPreview = false;
  flashlightOn = false;
  readonly MINIMUM_BALANCE = 500;

  private sessionService = inject(SessionService);
  private pillarService = inject(PillarService);
  private toast = inject(ToastService);
  private auth = inject(AuthService);
  private navCtrl = inject(NavController);

  ngOnInit() { this.getUserBalance(); }

  ngOnDestroy() { this.stopScan(); }

  async startScan() {
    try {
      const status = await BarcodeScanner.checkPermission({ 
        force: true 
      });
      if (!status.granted) {
        this.toast.showError('Camera permission required');
        return;
      }
      this.scanning = true;
      this.pillarDetails = null;
      this.showPillarPreview = false;
      const result = await BarcodeScanner.startScan();
      if (result.hasContent) {
        this.scanResult = result.content;
        await BarcodeScanner.stopScan();
        await this.processPillarQR(result.content);
      } else {
        this.toast.showInfo('No QR code detected');
        this.scanning = false;
      }
    } catch (error) {
      this.scanning = false;
      this.toast.showError('Scan failed. Try again.');
    }
  }

  async stopScan() {
    try { await BarcodeScanner.stopScan(); } catch (e) {}
    this.scanning = false;
  }

  async toggleFlashlight() {
    this.flashlightOn = !this.flashlightOn;
    try { await BarcodeScanner.toggleTorch(); } catch (e) {}
  }

  async processPillarQR(qrData: string) {
    try {
      let pillarId: number;
      let pillarData: any = {};
      if (qrData.startsWith('{')) {
        const parsed = JSON.parse(qrData);
        pillarId = parsed.pillar_id || parsed.charging_pillar_id;
        pillarData = parsed;
      } else {
        const params: Record<string, string> = {};
        qrData.split('|').forEach((part: string) => {
          const [key, value] = part.split(':');
          if (key && value) params[key.trim()] = value.trim();
        });
        pillarId = parseInt(params['pillar_id'] || params['id'] || '0');
        pillarData = {
          pillar_id: pillarId, model: params['model'] || 'Unknown',
          station: params['station'] || 'Charging Station',
          owner: params['owner'] || 'Unknown'
        };
      }
      if (!pillarId || pillarId === 0) {
        this.toast.showError('Invalid QR code');
        this.scanning = false;
        return;
      }
      this.pillarService.getPillarById(pillarId).subscribe({
        next: (pillar: any) => {
          this.pillarDetails = {...pillar, ...pillarData, id: pillar.charging_pillar_id || pillarId};
          this.showPillarPreview = true;
          this.scanning = false;
        },
        error: () => {
          this.pillarDetails = pillarData;
          this.pillarDetails.id = pillarId;
          this.showPillarPreview = true;
          this.scanning = false;
        }
      });
    } catch (e) {
      this.toast.showError('Invalid QR format');
      this.scanning = false;
    }
  }

  getUserBalance() {
    const user = this.auth.currentUser;
    this.walletBalance = user?.user_amount || 0;
  }

  confirmStartSession() {
    if (!this.pillarDetails) return;
    if (this.walletBalance < this.MINIMUM_BALANCE) {
      this.toast.showError('Insufficient balance. Need KES ' + this.MINIMUM_BALANCE);
      return;
    }
    this.isProcessing = true;
    const userId = this.auth.getUserId();
    if (!userId) {
      this.toast.showError('Please log in again');
      this.isProcessing = false;
      return;
    }
    this.sessionService.startSession({ user_id: userId, charging_pillar_id: this.pillarDetails.id }).subscribe({
      next: () => {
        this.isProcessing = false;
        this.toast.showSuccess('Session started!');
        this.navCtrl.navigateForward('/client/sessions');
      },
      error: (err: any) => {
        this.isProcessing = false;
        this.toast.showError(err.error?.message || 'Failed to start session');
      }
    });
  }

  navigateToWallet() { this.navCtrl.navigateForward('/client/wallet'); }
  cancelScan() { this.stopScan(); this.showPillarPreview = false; this.pillarDetails = null; }
  goBack() { this.navCtrl.back(); }
}