import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule, NavController } from "@ionic/angular";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: "register.page.html",
  styleUrls: ["register.page.scss"],
})
export class RegisterPage {
  name = '';
  email = '';
  phone = '';
  password = '';
  confirmPassword = '';
  loading = false;
  showError = false;
  errorMessage = '';

  private auth = inject(AuthService);
  private navCtrl = inject(NavController);

  async register() {
    this.showError = false;

    if (!this.name.trim() || !this.email.trim() || !this.password) {
      this.showError = true;
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.showError = true;
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    if (this.password.length < 8) {
      this.showError = true;
      this.errorMessage = 'Password must be at least 8 characters long.';
      return;
    }

    this.loading = true;
    try {
      await this.auth.register(this.name.trim(), this.email.trim(), this.password).toPromise();
      const user = this.auth.currentUser;
      // Keep consistent with the ClientGuard / AdminGuard role routing.
      if (user?.role === 'admin' || user?.role === 'super_admin' || user?.role === 'owner') {
        this.navCtrl.navigateRoot('/admin/dashboard');
      } else {
        this.navCtrl.navigateRoot('/client/dashboard');
      }
    } catch (error: any) {
      this.showError = true;
      this.errorMessage = error.error?.message || error.message || 'Registration failed. Please try again.';
    } finally {
      this.loading = false;
    }
  }

  goToLogin() {
    this.navCtrl.navigateBack('/auth/login');
  }
}