import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { ReportService } from "../services/report.service";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-reports",
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: "reports.page.html",
  styleUrls: ["reports.page.scss"],
})
export class ClientReportsPage implements OnInit {
  reports: any[] = [];
  loading = true;

  private reportService = inject(ReportService);
  private auth = inject(AuthService);

  ngOnInit() {
    this.loadReports();
  }

  loadReports() {
    this.loading = true;
    const userId = this.auth.getUserId();
    // Fall back to the general reports list if no user id is available.
    const request = userId
      ? this.reportService.getClientReports(userId)
      : this.reportService.getReports();

    request.subscribe({
      next: (response: any) => {
        this.reports = response?.items || response || [];
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error loading reports:', error);
        this.loading = false;
      }
    });
  }

  doRefresh(event: any) {
    this.loadReports();
    setTimeout(() => event.target.complete(), 1000);
  }
}