import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule, NavController } from "@ionic/angular";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: "login.page.html",
  styleUrls: ["login.page.scss"],
})
export class LoginPage {
  email = '';
  password = '';
  loading = false;
  showError = false;
  errorMessage = '';

  private auth = inject(AuthService);
  private navCtrl = inject(NavController);

  async login() {
    this.loading = true;
    this.showError = false;
    
    try {
      await this.auth.login(this.email, this.password).toPromise();
      const user = this.auth.currentUser;
      this.redirectByRole(user?.role);
    } catch (error: any) {
      this.showError = true;
      this.errorMessage = error.error?.message || error.message || 'Invalid credentials. Please try again.';
    } finally {
      this.loading = false;
    }
  }

  private redirectByRole(role?: string) {
    // Admin-role users manage the platform; all others use the client area.
    // Keep consistent with the ClientGuard / AdminGuard role checks to avoid
    // redirect loops between /client/dashboard and /admin/dashboard.
    if (role === 'admin' || role === 'super_admin' || role === 'owner') {
      this.navCtrl.navigateRoot('/admin/dashboard');
    } else {
      this.navCtrl.navigateRoot('/client/dashboard');
    }
  }

}