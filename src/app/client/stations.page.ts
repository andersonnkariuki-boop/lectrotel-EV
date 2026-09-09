import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { StationService } from "../services/station.service";
import { getPillarStatus } from "../models/pillar.model";
import * as L from 'leaflet';
import { forkJoin, Subscription } from 'rxjs';

@Component({
  selector: "app-stations",
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: "stations.page.html",
  styleUrls: ["stations.page.scss"],
})
export class ClientStationsPage implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('stationMap') stationMap?: ElementRef<HTMLDivElement>;
  stations: any[] = [];
  loading = true;
  expandedStationId: number | null = null;
  loadingPillars = false;
  locating = false;
  locationError = '';
  userLocation: { latitude: number; longitude: number } | null = null;
  mapReady = false;

  private stationService = inject(StationService);
  private map: L.Map | null = null;
  private stationMarkers = new Map<number, L.Marker>();
  private locationMarker: L.Layer | null = null;
  private subscriptions = new Subscription();

  ngOnInit() {
    this.loadStations();
  }

  ngAfterViewInit() {
    this.initializeMap();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.map?.remove();
  }

  loadStations() {
    this.loading = true;
    this.stationService.getStations().subscribe({
      next: (response: any) => {
        this.stations = (response?.items || response || []).map((station: any) => ({
          ...station,
          availablePillars: this.getKnownAvailablePillars(station),
          totalPillars: station.total_pillars ?? station.totalPillars
        }));
        this.sortStationsByDistance();
        this.loading = false;
        this.initializeMap();
        this.renderStationMarkers();
        this.loadAllStationAvailability();
      },
      error: (error: any) => {
        console.error('Error loading stations:', error);
        this.loading = false;
      }
    });
  }

  private initializeMap() {
    if (this.map || !this.stationMap?.nativeElement) return;
    this.map = L.map(this.stationMap.nativeElement, { zoomControl: false }).setView([-1.2864, 36.8172], 11);
    L.control.zoom({ position: 'bottomright' }).addTo(this.map);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(this.map);
    this.mapReady = true;
  }

  private renderStationMarkers() {
    if (!this.map) return;
    this.stationMarkers.forEach(marker => marker.remove());
    this.stationMarkers.clear();

    const coordinates = this.stations.filter(station => this.hasCoordinates(station));
    coordinates.forEach(station => {
      const available = station.availablePillars;
      const marker = L.marker([Number(station.latitude), Number(station.longitude)], {
        icon: this.createStationIcon(available)
      }).addTo(this.map!);
      marker.bindPopup(this.stationPopup(station));
      marker.on('click', () => {
        this.expandedStationId = station.charging_station_id;
        if (!station._pillars) this.loadStationPillars(station);
      });
      this.stationMarkers.set(station.charging_station_id, marker);
    });

    if (coordinates.length > 0 && !this.userLocation) {
      this.map.fitBounds(L.latLngBounds(coordinates.map(station => [
        Number(station.latitude), Number(station.longitude)
      ] as [number, number])).pad(0.12));
    }
  }

  private createStationIcon(available: number | null) {
    const color = available === null ? '#176b87' : available > 0 ? '#16836b' : '#637889';
    return L.divIcon({
      className: 'station-map-marker',
      html: `<span style="background:${color}">${available === null ? '•' : available}</span>`,
      iconSize: [38, 38],
      iconAnchor: [19, 19],
      popupAnchor: [0, -20]
    });
  }

  private stationPopup(station: any): string {
    const address = station.location || station.address || station.city || 'Charging station';
    const availability = station.availablePillars === null
      ? 'Availability loading…'
      : `${station.availablePillars} free pillar${station.availablePillars === 1 ? '' : 's'}`;
    return `<strong>${this.escapeHtml(station.name || 'Charging station')}</strong><br>` +
      `<span>${this.escapeHtml(address)}</span><br>` +
      `<span>${availability}</span><br>` +
      `<a href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${station.latitude},${station.longitude}`)}" target="_blank" rel="noopener">Get directions</a>`;
  }

  private escapeHtml(value: string): string {
    return value.replace(/[&<>'"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character] || character));
  }

  private loadAllStationAvailability() {
    const stationsToLoad = this.stations.filter(station => !station._pillars);
    if (!stationsToLoad.length) return;
    this.subscriptions.add(forkJoin(stationsToLoad.map(station =>
      this.stationService.getStationPillars(station.charging_station_id)
    )).subscribe({
      next: (responses: any[]) => {
        responses.forEach((response, index) => this.applyPillars(stationsToLoad[index], response));
        this.renderStationMarkers();
      },
      error: () => this.renderStationMarkers()
    }));
  }

  private applyPillars(station: any, response: any) {
    const items = response?.items || response?.pillars || response || [];
    station._pillars = items.map((p: any) => {
      const status = getPillarStatus(p);
      return { ...p, status, isAvailable: status.label === 'AVAILABLE' };
    });
    station.totalPillars = station._pillars.length;
    station.availablePillars = station._pillars.filter((p: any) => p.isAvailable).length;
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
        this.applyPillars(station, response);
        this.renderStationMarkers();
        this.loadingPillars = false;
      },
      error: (error: any) => {
        console.error('Error loading station pillars:', error);
        station._pillars = [];
        this.loadingPillars = false;
      }
    });
  }

  findNearbyStations() {
    if (!navigator.geolocation) {
      this.locationError = 'Location services are not available on this device.';
      return;
    }

    this.locating = true;
    this.locationError = '';
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.userLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        this.sortStationsByDistance();
        this.updateLocationMarker();
        this.map?.setView([this.userLocation.latitude, this.userLocation.longitude], 13);
        this.locating = false;
      },
      () => {
        this.locationError = 'We could not access your location. You can still browse all stations.';
        this.locating = false;
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
    );
  }

  openDirections(station: any) {
    const destination = this.hasCoordinates(station)
      ? `${station.latitude},${station.longitude}`
      : encodeURIComponent(station.location || station.address || station.name);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${destination}`, '_blank');
  }

  hasCoordinates(station: any): boolean {
    return Number.isFinite(Number(station.latitude)) && Number.isFinite(Number(station.longitude));
  }

  getDistanceLabel(station: any): string {
    const distance = this.getDistanceKm(station);
    return distance === null ? 'Distance unavailable' : `${distance.toFixed(distance < 10 ? 1 : 0)} km away`;
  }

  private getDistanceKm(station: any): number | null {
    if (!this.userLocation || !this.hasCoordinates(station)) return null;
    const lat1 = this.userLocation.latitude * Math.PI / 180;
    const lat2 = Number(station.latitude) * Math.PI / 180;
    const deltaLat = lat2 - lat1;
    const deltaLon = (Number(station.longitude) - this.userLocation.longitude) * Math.PI / 180;
    const a = Math.sin(deltaLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLon / 2) ** 2;
    return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  private sortStationsByDistance() {
    if (!this.userLocation) return;
    this.stations.sort((a, b) => (this.getDistanceKm(a) ?? Number.POSITIVE_INFINITY) -
      (this.getDistanceKm(b) ?? Number.POSITIVE_INFINITY));
  }

  private updateLocationMarker() {
    if (!this.map || !this.userLocation) return;
    this.locationMarker?.remove();
    this.locationMarker = L.circleMarker([this.userLocation.latitude, this.userLocation.longitude], {
      radius: 8,
      color: '#176b87',
      fillColor: '#35b9bd',
      fillOpacity: 0.9,
      weight: 3
    }).addTo(this.map).bindTooltip('You are here');
  }

  private getKnownAvailablePillars(station: any): number | null {
    const value = station.available_pillars ?? station.availablePillars;
    return value === undefined || value === null ? null : Number(value);
  }

  doRefresh(event: any) {
    this.loadStations();
    setTimeout(() => event.target.complete(), 1000);
  }
}