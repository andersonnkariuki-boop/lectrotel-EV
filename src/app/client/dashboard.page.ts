import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule, NavController } from "@ionic/angular";
import { AuthService } from "../services/auth.service";
import { WalletService } from "../services/wallet.service";
import { SessionService } from "../services/session.service";
import { PillarService } from "../services/pillar.service";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: "dashboard.page.html",
  styleUrls: ["dashboard.page.scss"],
})
export class ClientDashboardPage implements OnInit {
  user: any = null;
  walletBalance = 0;
  activeSessions = 0;
  totalPillars = 0;
  loading = true;

  private auth = inject(AuthService);
  private walletService = inject(WalletService);
  private sessionService = inject(SessionService);
  private pillarService = inject(PillarService);
  private navCtrl = inject(NavController);

  ngOnInit() {
    this.user = this.auth.currentUser;
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.walletService.getWallet().subscribe({
      next: (response: any) => {
        const wallet = response?.data ?? response?.wallet ?? response;
        const balance = Number(wallet?.user_amount ?? wallet?.balance ?? wallet?.amount);
        this.walletBalance = Number.isFinite(balance) ? balance : 0;
      },
      error: (error: any) => console.error('Error loading wallet:', error)
    });

    // Load sessions count
    this.sessionService.getSessions().subscribe({
      next: (response: any) => {
        const userId = this.auth.getUserId();
        const sessions = (response?.items || response || []).filter((s: any) =>
          Number(s.user_creator ?? s.user_id) === Number(userId)
        );
        this.activeSessions = sessions.filter((s: any) => !s.end_time).length;
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error loading sessions:', error);
        this.loading = false;
      }
    });

    // Load pillars count
    this.pillarService.getPillars().subscribe({
      next: (response: any) => {
        const pillars = response?.items || response || [];
        this.totalPillars = pillars.length;
      },
      error: (error: any) => {
        console.error('Error loading pillars:', error);
      }
    });
  }

  openQRScan() {
    this.navCtrl.navigateForward('/scan');
  }

  goToSessions() {
    this.navCtrl.navigateForward('/client/sessions');
  }

  goToPillars() {
    this.navCtrl.navigateForward('/client/pillars');
  }

  goToWallet() {
    this.navCtrl.navigateForward('/client/wallet');
  }

  logout() {
    this.auth.logout();
  }
}