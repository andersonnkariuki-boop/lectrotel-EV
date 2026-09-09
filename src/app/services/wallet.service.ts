import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Wallet, WalletTransaction, TopUpRequest, WalletResponse } from "../models/wallet.model";
import { AuthService } from "./auth.service";
import { map } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  private http = inject(HttpClient);
  private auth = inject(AuthService);
  private url = environment.apiUrl;

  getWallet(): any {
    const userId = this.auth.getUserId();
    return this.http.get<WalletResponse>(
      `${this.url}user/${userId}`,
      this.auth.jwtHeader()
    ).pipe(map((user: any) => ({
      user_id: Number(user?.user_id ?? userId ?? 0),
      user_amount: Number(user?.user_amount ?? 0)
    })));
  }

  getTransactions(): any {
    const userId = this.auth.getUserId();
    return this.http.get<{ items: WalletTransaction[] }>(
      `${this.url}clientwallets/list`,
      this.auth.jwtHeader()
    ).pipe(map((response: any) => ({
      items: (response?.items ?? []).filter((item: any) => Number(item.user_id) === Number(userId))
    })));
  }

  topUp(request: TopUpRequest): any {
    return this.http.post<any>(
      `${this.url}tokens/purchase/prepaid/elec`,
      { user_id: this.auth.getUserId(), amount: request.amount, phone_number: request.phone_number },
      this.auth.jwtHeader()
    );
  }
}
