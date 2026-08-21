import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Station, StationResponse } from "../models/station.model";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root',
})
export class StationService {
  private http = inject(HttpClient);
  private auth = inject(AuthService);
  private url = environment.apiUrl;

  getStations(): any {
    return this.http.get<StationResponse>(
      `${this.url}chargingstations/list`,
      this.auth.jwtHeader()
    );
  }

  getStationById(id: number): any {
    return this.http.get<Station>(
      `${this.url}chargingstations/${id}`,
      this.auth.jwtHeader()
    );
  }

  getStationPillars(id: number): any {
    return this.http.get<any>(
      `${this.url}chargingstations/${id}/pillars`,
      this.auth.jwtHeader()
    );
  }
}
