import { inject, Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  private readonly maxRetries = 3;
  private readonly retryDelay = 500; // ms

  async canActivate(): Promise<boolean | UrlTree> {
    let attempts = 0;

    const checkAuth = async (): Promise<boolean | UrlTree> => {
      if (this.auth.isAuthenticated()) {
        return true;
      }

      // Retry logic for cases where auth service needs time to initialize
      if (attempts < this.maxRetries) {
        attempts++;
        await new Promise(resolve => setTimeout(resolve, this.retryDelay));
        return checkAuth();
      }

      return false;
    };

    return checkAuth();
  }
}
