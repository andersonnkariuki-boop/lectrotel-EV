import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { StationService } from "../services/station.service";

@Component({
  selector: "app-stations",
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: "stations.page.html",
  styleUrls: ["stations.page.scss"],
})
export class AdminStationsPage implements OnInit {
  stations: any[] = [];
  loading = true;

  private stationService = inject(StationService);

  ngOnInit() {
    this.loadStations();
  }

  loadStations() {
    this.loading = true;
    this.stationService.getStations().subscribe({
      next: (response: any) => {
        this.stations = response?.items || response || [];
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error loading stations:', error);
        this.loading = false;
      }
    });
  }

  doRefresh(event: any) {
    this.loadStations();
    setTimeout(() => event.target.complete(), 1000);
  }
}