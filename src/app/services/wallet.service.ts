import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Wallet, WalletTransaction, TopUpRequest, WalletResponse } from "../models/wallet.model";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  private http = inject(HttpClient);
  private auth = inject(AuthService);
  private url = environment.apiUrl;

  getWallet(): any {
    return this.http.get<WalletResponse>(
      `${this.url}wallet/balance`,
      this.auth.jwtHeader()
    );
  }

  getTransactions(): any {
    return this.http.get<{ items: WalletTransaction[] }>(
      `${this.url}wallet/transactions`,
      this.auth.jwtHeader()
    );
  }

  topUp(request: TopUpRequest): any {
    return this.http.post<any>(
      `${this.url}wallet/topup`,
      request,
      this.auth.jwtHeader()
    );
  }
}
