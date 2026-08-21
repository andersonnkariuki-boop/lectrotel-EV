import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { ClientService } from "../services/client.service";

@Component({
  selector: "app-clients",
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: "clients.page.html",
  styleUrls: ["clients.page.scss"],
})
export class AdminClientsPage implements OnInit {
  clients: any[] = [];
  loading = true;

  private clientService = inject(ClientService);

  ngOnInit() {
    this.loadClients();
  }

  loadClients() {
    this.loading = true;
    this.clientService.getClients().subscribe({
      next: (response: any) => {
        this.clients = response?.items || response || [];
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error loading clients:', error);
        this.loading = false;
      }
    });
  }

  doRefresh(event: any) {
    this.loadClients();
    setTimeout(() => event.target.complete(), 1000);
  }
}