import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule, NavController } from "@ionic/angular";
import { PillarService } from "../services/pillar.service";
import { getPillarStatus } from "../models/pillar.model";

@Component({
  selector: "app-pillars",
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: "pillars.page.html",
  styleUrls: ["pillars.page.scss"],
})
export class ClientPillarsPage implements OnInit {
  pillars: any[] = [];
  filteredPillars: any[] = [];
  loading = false;
  searchTerm = '';
  selectedFilter = 'all';

  private pillarService = inject(PillarService);
  private navCtrl = inject(NavController);

  ngOnInit() {
    this.loadPillars();
  }

  loadPillars() {
    this.loading = true;
    this.pillarService.getPillars().subscribe({
      next: (response) => {
        const items = response?.items || response || [];
        this.pillars = items.map((p: any) => ({
          ...p,
          status: getPillarStatus(p),
          isAvailable: p.is_deactivated !== true && !p.is_suspended && !p.is_charging
        }));
        this.applyFilters();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading pillars:', error);
        this.loading = false;
      }
    });
  }

  applyFilters() {
    let filtered = [...this.pillars];

    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter((p: any) =>
        p.model?.toLowerCase().includes(term) ||
        p.charging_pillar_id?.toString().includes(term)
      );
    }

    if (this.selectedFilter === 'available') {
      filtered = filtered.filter((p: any) => p.isAvailable);
    } else if (this.selectedFilter === 'active') {
      filtered = filtered.filter((p: any) => p.is_charging);
    }

    this.filteredPillars = filtered;
  }

  onSearch() {
    this.applyFilters();
  }

  onFilterChange() {
    this.applyFilters();
  }

  openQRScan() {
    this.navCtrl.navigateForward('/scan');
  }

  openPillarLocation(pillar: any) {
    const query = this.hasCoordinates(pillar)
      ? `${pillar.latitude},${pillar.longitude}`
      : [pillar.model, pillar.station_name, pillar.location, `Pillar ${pillar.charging_pillar_id}`]
        .filter(Boolean)
        .join(' ');
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`,
      '_blank',
      'noopener,noreferrer'
    );
  }

  hasCoordinates(pillar: any): boolean {
    return Number.isFinite(Number(pillar.latitude)) && Number.isFinite(Number(pillar.longitude));
  }

  getPillarLocationLabel(pillar: any): string {
    if (this.hasCoordinates(pillar)) {
      return `${Number(pillar.latitude).toFixed(5)}, ${Number(pillar.longitude).toFixed(5)}`;
    }
    return pillar.station_name || pillar.location || 'Location available in Google Maps';
  }

  getStatusClass(pillar: any): string {
    if (pillar.is_deactivated) return 'offline';
    if (pillar.is_charging) return 'active';
    if (pillar.is_suspended) return 'suspended';
    return 'available';
  }

  getStatusLabel(pillar: any): string {
    if (pillar.is_deactivated) return 'Offline';
    if (pillar.is_charging) return 'In Use';
    if (pillar.is_suspended) return 'Suspended';
    return 'Available';
  }
}