import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { SessionService } from "../services/session.service";

@Component({
  selector: "app-sessions",
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: "sessions.page.html",
  styleUrls: ["sessions.page.scss"],
})
export class AdminSessionsPage implements OnInit {
  sessions: any[] = [];
  loading = true;

  private sessionService = inject(SessionService);

  ngOnInit() {
    this.loadSessions();
  }

  loadSessions() {
    this.loading = true;
    this.sessionService.getSessions().subscribe({
      next: (response: any) => {
        const items = response?.items || response || [];
        this.sessions = items.map((s: any) => ({
          ...s,
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

  doRefresh(event: any) {
    this.loadSessions();
    setTimeout(() => event.target.complete(), 1000);
  }
}