import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Report } from "../models/report.model";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private http = inject(HttpClient);
  private auth = inject(AuthService);
  private url = environment.apiUrl;

  getReports(): any {
    return this.http.get<any>(
      `${this.url}reports/list`,
      this.auth.jwtHeader()
    );
  }

  getClientReports(userId: number): any {
    return this.http.get<any>(
      `${this.url}reports/client/${userId}`,
      this.auth.jwtHeader()
    );
  }

  getStationReports(stationId: number): any {
    return this.http.get<any>(
      `${this.url}reports/station/${stationId}`,
      this.auth.jwtHeader()
    );
  }
}
