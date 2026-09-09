import { Component, OnInit, OnDestroy, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule, NavController } from "@ionic/angular";
import { SessionService } from "../services/session.service";
import { AuthService } from "../services/auth.service";
import { Subscription, interval } from "rxjs";

@Component({
  selector: "app-sessions",
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: "sessions.page.html",
  styleUrls: ["sessions.page.scss"],
})
export class ClientSessionsPage implements OnInit, OnDestroy {
  sessions: any[] = [];
  loading = false;
  autoRefresh = true;
  refreshInterval: Subscription | null = null;

  private sessionService = inject(SessionService);
  private navCtrl = inject(NavController);
  private auth = inject(AuthService);

  ngOnInit() {
    this.loadSessions();
    this.startAutoRefresh();
  }

  ngOnDestroy() {
    this.stopAutoRefresh();
  }

  loadSessions() {
    this.loading = true;
    this.sessionService.getSessions().subscribe({
      next: (response: any) => {
        const userId = this.auth.getUserId();
        const items = (response?.items || response || []).filter((s: any) =>
          Number(s.user_creator ?? s.user_id) === Number(userId)
        );
        this.sessions = items.map((s: any) => ({
          ...s,
          isActive: !s.end_time,
          duration: this.calculateDuration(s),
          status: s.end_time ? 'completed' : 'active',
          statusLabel: s.end_time ? 'Completed' : 'Active',
          statusColor: s.end_time ? 'success' : 'warning'
        }));
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error loading sessions:', error);
        this.loading = false;
      }
    });
  }

  calculateDuration(session: any): string {
    const start = new Date(session.start_time);
    const end = session.end_time ? new Date(session.end_time) : new Date();
    const diffMins = Math.floor((end.getTime() - start.getTime()) / 60000);
    
    if (diffMins < 60) {
      const mins = diffMins;
      return mins + ' min';
    }
    const hours = Math.floor(diffMins / 60);
    return hours + 'h';
  }

  startAutoRefresh() {
    this.refreshInterval = interval(30000).subscribe(() => {
      if (this.autoRefresh) {
        this.loadSessions();
      }
    });
  }

  stopAutoRefresh() {
    if (this.refreshInterval) {
      this.refreshInterval.unsubscribe();
    }
  }

  openQRScan() {
    this.navCtrl.navigateForward('/scan');
  }

  doRefresh(event: any) {
    this.loadSessions();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
}