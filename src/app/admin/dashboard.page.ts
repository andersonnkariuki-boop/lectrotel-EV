import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { SessionService } from "../services/session.service";
import { PillarService } from "../services/pillar.service";
import { StationService } from "../services/station.service";
import { ClientService } from "../services/client.service";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: "dashboard.page.html",
  styleUrls: ["dashboard.page.scss"],
})
export class AdminDashboardPage implements OnInit {
  sessionCount = 0;
  pillarCount = 0;
  stationCount = 0;
  clientCount = 0;
  loading = true;

  private sessionService = inject(SessionService);
  private pillarService = inject(PillarService);
  private stationService = inject(StationService);
  private clientService = inject(ClientService);
  private auth = inject(AuthService);

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    this.sessionService.getSessions().subscribe({
      next: (r: any) => { this.sessionCount = (r?.items || r || []).length; },
      error: () => {}
    });
    this.pillarService.getPillars().subscribe({
      next: (r: any) => { this.pillarCount = (r?.items || r || []).length; },
      error: () => {}
    });
    this.stationService.getStations().subscribe({
      next: (r: any) => { this.stationCount = (r?.items || r || []).length; },
      error: () => {}
    });
    this.clientService.getClients().subscribe({
      next: (r: any) => { this.clientCount = (r?.items || r || []).length; },
      error: () => {}
    });
    // Stats are best-effort; hide the spinner once the fastest request settles.
    setTimeout(() => { this.loading = false; }, 2500);
  }

  logout() {
    this.auth.logout();
  }
}