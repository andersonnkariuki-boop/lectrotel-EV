import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Session, SessionResponse } from "../models/session.model";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private http = inject(HttpClient);
  private auth = inject(AuthService);
  private url = environment.apiUrl;

  getSessions(): any {
    const userId = this.auth.getUserId();
    return this.http.get<SessionResponse>(
      `${this.url}chargingsession/list`,
      this.auth.jwtHeader()
    );
  }

  startSession(model: { user_id: number; charging_pillar_id: number }) {
    return this.http.post<any>(
      `${this.url}chargingsession/add`,
      model,
      this.auth.jwtHeader()
    );
  }

  getSessionById(id: number) {
    return this.http.get<any>(
      `${this.url}chargingsession/${id}`,
      this.auth.jwtHeader()
    );
  }

  stopSession(id: number) {
    return this.http.put<any>(
      `${this.url}chargingsession/stop/${id}`,
      {},
      this.auth.jwtHeader()
    );
  }
}
