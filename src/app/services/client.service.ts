import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: "root" })
export class ClientService {
  private http = inject(HttpClient);
  private auth = inject(AuthService);
  private url = environment.apiUrl;

  /**
   * Fetch the list of registered clients (used by the admin dashboard).
   * NOTE: endpoint path is an assumption — adjust `${url}users/list` to match
   * the backend's real client/user listing route if different.
   */
  getClients() {
    return this.http.get<any>(`${this.url}users/list`, this.auth.jwtHeader());
  }
}
