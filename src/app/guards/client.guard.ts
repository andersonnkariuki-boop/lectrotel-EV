import { inject, Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({ providedIn: "root" })
export class ClientGuard implements CanActivate {
  canActivate(): boolean {
    const auth = inject(AuthService);
    const router = inject(Router);

    if (!auth.isAuthenticated()) {
      router.navigate(["/auth/login"]);
      return false;
    }

    if (auth.userRole !== "client") {
      router.navigate(["/admin/dashboard"]);
      return false;
    }
    return true;
  }
}
