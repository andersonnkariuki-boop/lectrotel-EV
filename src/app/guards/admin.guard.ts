import { inject, Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { UserRole } from "../models/user.model";

// Roles that may access the admin area. A "super_admin" and a "pillar owner"
// both manage the platform, so they share the admin dashboard with admins.
const ADMIN_ROLES: UserRole[] = ["admin", "super_admin", "owner"];

@Injectable({ providedIn: "root" })
export class AdminGuard implements CanActivate {
  canActivate(): boolean {
    const auth = inject(AuthService);
    const router = inject(Router);

    if (!auth.isAuthenticated()) {
      router.navigate(["/auth/login"]);
      return false;
    }

    if (!ADMIN_ROLES.includes(auth.userRole as UserRole)) {
      router.navigate(["/client/dashboard"]);
      return false;
    }
    return true;
  }
}
