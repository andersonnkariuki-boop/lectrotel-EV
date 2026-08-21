import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { WalletService } from "../services/wallet.service";
import { ToastService } from "../services/toast.service";
import { formatCurrency } from "../models/wallet.model";

@Component({
  selector: "app-wallet",
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: "wallet.page.html",
  styleUrls: ["wallet.page.scss"],
})
export class ClientWalletPage implements OnInit {
  balance = 0;
  transactions: any[] = [];
  loading = true;
  loadingTransactions = false;

  // Top-up form
  topUpAmount = 0;
  phoneNumber = '';
  toppingUp = false;

  private walletService = inject(WalletService);
  private toast = inject(ToastService);

  ngOnInit() {
    this.loadWallet();
    this.loadTransactions();
  }

  loadWallet() {
    this.walletService.getWallet().subscribe({
      next: (response: any) => {
        // Handle both direct ({ user_amount }) and wrapped responses.
        this.balance = Number(response?.user_amount ?? response?.balance ?? this.balance);
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error loading wallet:', error);
        this.loading = false;
      }
    });
  }

  loadTransactions() {
    this.loadingTransactions = true;
    this.walletService.getTransactions().subscribe({
      next: (response: any) => {
        this.transactions = response?.items || response || [];
        this.loadingTransactions = false;
      },
      error: (error: any) => {
        console.error('Error loading transactions:', error);
        this.loadingTransactions = false;
      }
    });
  }

  formatAmount(amount: any): string {
    return formatCurrency(Number(amount || 0));
  }

  topUp() {
    const amount = Number(this.topUpAmount);
    const phone = this.phoneNumber.trim();

    if (!amount || amount <= 0) {
      this.toast.showError('Please enter a valid top-up amount.');
      return;
    }
    if (!phone) {
      this.toast.showError('Please enter your M-Pesa phone number.');
      return;
    }

    this.toppingUp = true;
    this.walletService.topUp({ amount, phone_number: phone }).subscribe({
      next: (response: any) => {
        this.toppingUp = false;
        this.toast.showSuccess(response?.message || 'Top-up initiated. Complete the M-Pesa prompt.');
        this.topUpAmount = 0;
        this.phoneNumber = '';
        this.loadWallet();
        this.loadTransactions();
      },
      error: (error: any) => {
        this.toppingUp = false;
        this.toast.showError(error.error?.message || error.message || 'Top-up failed. Please try again.');
      }
    });
  }

  doRefresh(event: any) {
    this.loadWallet();
    this.loadTransactions();
    setTimeout(() => event.target.complete(), 1000);
  }
}