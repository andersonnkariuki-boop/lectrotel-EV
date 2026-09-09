import { inject, Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { UserRole } from "../models/user.model";

const ACCOUNT_CREATOR_ROLES: UserRole[] = ["admin", "super_admin"];

@Injectable({ providedIn: "root" })
export class AccountCreationGuard implements CanActivate {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  canActivate(): boolean | UrlTree {
    if (!this.auth.isAuthenticated()) {
      return this.router.createUrlTree(["/auth/login"]);
    }

    return ACCOUNT_CREATOR_ROLES.includes(this.auth.userRole as UserRole)
      ? true
      : this.router.createUrlTree(["/client/dashboard"]);
  }
}
