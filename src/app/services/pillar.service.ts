import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Pillar, PillarStatus, getPillarStatus } from "../models/pillar.model";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root',
})
export class PillarService {
  private http = inject(HttpClient);
  private auth = inject(AuthService);
  private url = environment.apiUrl;

  getPillars() {
    return this.http.get<any>(
      `${this.url}chargingpillars/list`,
      this.auth.jwtHeader()
    );
  }

  getPillarById(id: number) {
    return this.http.get<any>(
      `${this.url}chargingPillar/${id}`,
      this.auth.jwtHeader()
    );
  }

  getPillarQRData(id: number) {
    return this.http.get<{ qr_data: string; pillar: Pillar }>(
      `${this.url}chargingpillar/qr/${id}`,
      this.auth.jwtHeader()
    );
  }

  getPillarsWithStatus(): Pillar[] {
    // Get pillars from API and add status
    return [];
  }
}