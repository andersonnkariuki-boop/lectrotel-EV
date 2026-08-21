import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { PillarService } from "../services/pillar.service";
import { getPillarStatus } from "../models/pillar.model";

@Component({
  selector: "app-pillars",
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: "pillars.page.html",
  styleUrls: ["pillars.page.scss"],
})
export class AdminPillarsPage implements OnInit {
  pillars: any[] = [];
  loading = true;

  private pillarService = inject(PillarService);

  ngOnInit() {
    this.loadPillars();
  }

  loadPillars() {
    this.loading = true;
    this.pillarService.getPillars().subscribe({
      next: (response: any) => {
        const items = response?.items || response || [];
        this.pillars = items.map((p: any) => ({ ...p, status: getPillarStatus(p) }));
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error loading pillars:', error);
        this.loading = false;
      }
    });
  }

  doRefresh(event: any) {
    this.loadPillars();
    setTimeout(() => event.target.complete(), 1000);
  }
}