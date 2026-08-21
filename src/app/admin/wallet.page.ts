import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

@Component({
  selector: "app-wallet",
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: "wallet.page.html",
  styleUrls: ["wallet.page.scss"],
})
export class AdminWalletPage {}