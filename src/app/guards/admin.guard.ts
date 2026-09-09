import { inject, Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { UserRole } from "../models/user.model";

// Roles that may access the admin area. A "super_admin" and a "pillar owner"
// both manage the platform, so they share the admin dashboard with admins.
const ADMIN_ROLES: UserRole[] = ["admin", "super_admin", "owner"];

@Injectable({ providedIn: "root" })
export class AdminGuard implements CanActivate {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  canActivate(): boolean | UrlTree {
    if (!this.auth.isAuthenticated()) {
      return this.router.createUrlTree(["/auth/login"]);
    }

    if (!ADMIN_ROLES.includes(this.auth.userRole as UserRole)) {
      return this.router.createUrlTree(["/client/dashboard"]);
    }
    return true;
  }
}
