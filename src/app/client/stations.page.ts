import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { StationService } from "../services/station.service";
import { getPillarStatus } from "../models/pillar.model";

@Component({
  selector: "app-stations",
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: "stations.page.html",
  styleUrls: ["stations.page.scss"],
})
export class ClientStationsPage implements OnInit {
  stations: any[] = [];
  loading = true;
  expandedStationId: number | null = null;
  loadingPillars = false;

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

  toggleStation(station: any) {
    if (this.expandedStationId === station.charging_station_id) {
      this.expandedStationId = null;
      return;
    }
    this.expandedStationId = station.charging_station_id;
    if (!station._pillars) {
      this.loadStationPillars(station);
    }
  }

  loadStationPillars(station: any) {
    this.loadingPillars = true;
    this.stationService.getStationPillars(station.charging_station_id).subscribe({
      next: (response: any) => {
        const items = response?.items || response?.pillars || response || [];
        station._pillars = items.map((p: any) => ({
          ...p,
          status: getPillarStatus(p),
          isAvailable: p.is_deactivated !== true && !p.is_suspended && !p.is_charging
        }));
        this.loadingPillars = false;
      },
      error: (error: any) => {
        console.error('Error loading station pillars:', error);
        station._pillars = [];
        this.loadingPillars = false;
      }
    });
  }

  doRefresh(event: any) {
    this.loadStations();
    setTimeout(() => event.target.complete(), 1000);
  }
}