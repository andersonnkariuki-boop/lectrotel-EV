from pathlib import Path

root = Path('e:/projects/lectrotel-EV')
app = root / 'src' / 'app'

def write(path, content):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding='utf-8')

routes = """import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { ClientGuard } from './guards/client.guard';

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./auth/login.page').then((m) => m.LoginPage),
      },
      {
        path: 'register',
        loadComponent: () => import('./auth/register.page').then((m) => m.RegisterPage),
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'client',
    canActivate: [AuthGuard, ClientGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./client/dashboard.page').then((m) => m.ClientDashboardPage),
      },
      {
        path: 'sessions',
        loadComponent: () => import('./client/sessions.page').then((m) => m.ClientSessionsPage),
      },
      {
        path: 'stations',
        loadComponent: () => import('./client/stations.page').then((m) => m.ClientStationsPage),
      },
      {
        path: 'pillars',
        loadComponent: () => import('./client/pillars.page').then((m) => m.ClientPillarsPage),
      },
      {
        path: 'reports',
        loadComponent: () => import('./client/reports.page').then((m) => m.ClientReportsPage),
      },
      {
        path: 'wallet',
        loadComponent: () => import('./client/wallet.page').then((m) => m.ClientWalletPage),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'admin',
    canActivate: [AuthGuard, AdminGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./admin/dashboard.page').then((m) => m.AdminDashboardPage),
      },
      {
        path: 'pillars',
        loadComponent: () => import('./admin/pillars.page').then((m) => m.AdminPillarsPage),
      },
      {
        path: 'stations',
        loadComponent: () => import('./admin/stations.page').then((m) => m.AdminStationsPage),
      },
      {
        path: 'sessions',
        loadComponent: () => import('./admin/sessions.page').then((m) => m.AdminSessionsPage),
      },
      {
        path: 'clients',
        loadComponent: () => import('./admin/clients.page').then((m) => m.AdminClientsPage),
      },
      {
        path: 'reports',
        loadComponent: () => import('./admin/reports.page').then((m) => m.AdminReportsPage),
      },
      {
        path: 'wallet',
        loadComponent: () => import('./admin/wallet.page').then((m) => m.AdminWalletPage),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'scan',
    children: [
      {
        path: 'qr-scan',
        loadComponent: () => import('./scan/qr-scan.page').then((m) => m.QrScanPage),
      },
      {
        path: '',
        redirectTo: 'qr-scan',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
"""

page_base = """import { Component } from \"@angular/core\";
import { CommonModule } from \"@angular/common\";
import { IonButton, IonContent, IonHeader, IonTitle, IonToolbar } from \"@ionic/angular\";

@Component({
  selector: \"__SELECTOR__\",
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonButton],
  template: `
    <ion-header translucent>
      <ion-toolbar>
        <ion-title>__TITLE__</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class=\"ion-padding\">
      <h1>__TITLE__</h1>
      <p>__DESCRIPTION__</p>
      <ion-button expand=\"block\" routerLink=\"__LINK__\">Go to __LINK_TEXT__</ion-button>
    </ion-content>
  `,
})
export class __CLASS_NAME__ {}
"""

login = """import { Component } from \"@angular/core\";
import { CommonModule } from \"@angular/common\";
import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonTitle, IonToolbar } from \"@ionic/angular\";

@Component({
  selector: \"app-login\",
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton],
  template: `
    <ion-header translucent>
      <ion-toolbar>
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class=\"ion-padding\">
      <h1>Charg-E Login</h1>
      <p>Sign in to access your client or admin workspace.</p>
      <ion-item>
        <ion-label position=\"floating\">Email</ion-label>
        <ion-input type=\"email\"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position=\"floating\">Password</ion-label>
        <ion-input type=\"password\"></ion-input>
      </ion-item>
      <ion-button expand=\"block\" routerLink=\"/client/dashboard\">Client Dashboard</ion-button>
      <ion-button expand=\"block\" fill=\"outline\" routerLink=\"/admin/dashboard\">Admin Dashboard</ion-button>
      <ion-button expand=\"block\" fill=\"clear\" routerLink=\"/auth/register\">Create account</ion-button>
    </ion-content>
  `,
})
export class LoginPage {}
"""

register = """import { Component } from \"@angular/core\";
import { CommonModule } from \"@angular/common\";
import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonTitle, IonToolbar } from \"@ionic/angular\";

@Component({
  selector: \"app-register\",
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton],
  template: `
    <ion-header translucent>
      <ion-toolbar>
        <ion-title>Register</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class=\"ion-padding\">
      <h1>Create Charg-E Account</h1>
      <ion-item>
        <ion-label position=\"floating\">Full name</ion-label>
        <ion-input type=\"text\"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position=\"floating\">Email</ion-label>
        <ion-input type=\"email\"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position=\"floating\">Password</ion-label>
        <ion-input type=\"password\"></ion-input>
      </ion-item>
      <ion-button expand=\"block\" routerLink=\"/client/dashboard\">Register</ion-button>
      <ion-button expand=\"block\" fill=\"clear\" routerLink=\"/auth/login\">Back to login</ion-button>
    </ion-content>
  `,
})
export class RegisterPage {}
"""

scan = """import { Component } from \"@angular/core\";
import { CommonModule } from \"@angular/common\";
import { IonButton, IonContent, IonHeader, IonTitle, IonToolbar } from \"@ionic/angular\";

@Component({
  selector: \"app-qr-scan\",
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonButton],
  template: `
    <ion-header translucent>
      <ion-toolbar>
        <ion-title>QR Scan</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class=\"ion-padding\">
      <h1>Charge Station Scan</h1>
      <p>Scan a QR code to start a charging session.</p>
      <ion-button expand=\"block\" routerLink=\"/client/sessions\">My Sessions</ion-button>
    </ion-content>
  `,
})
export class QrScanPage {}
"""

services = {
    'auth.service.ts': """import { Injectable } from \"@angular/core\";
import { Router } from \"@angular/router\";
import { User, UserRole } from \"../models/user.model\";

@Injectable({ providedIn: \"root\" })
export class AuthService {
  private user: User | null = null;

  constructor(private router: Router) {}

  login(email: string, password: string): boolean {
    this.user = { id: \"1\", name: \"Charg-E User\", email, role: \"client\" };
    return true;
  }

  register(name: string, email: string, password: string): boolean {
    this.user = { id: \"2\", name, email, role: \"client\" };
    return true;
  }

  logout(): void {
    this.user = null;
    this.router.navigate([\"/auth/login\"]);
  }

  isAuthenticated(): boolean {
    return !!this.user;
  }

  get userRole(): UserRole | null {
    return this.user?.role ?? null;
  }

  get currentUser(): User | null {
    return this.user;
  }
}
""",
    'session.service.ts': """import { Injectable } from \"@angular/core\";
import { Session } from \"../models/session.model\";

@Injectable({ providedIn: \"root\" })
export class SessionService {
  getSessions(): Session[] {
    return [];
  }
}
""",
    'station.service.ts': """import { Injectable } from \"@angular/core\";
import { Station } from \"../models/station.model\";

@Injectable({ providedIn: \"root\" })
export class StationService {
  getStations(): Station[] {
    return [];
  }
}
""",
    'client.service.ts': """import { Injectable } from \"@angular/core\";
import { User } from \"../models/user.model\";

@Injectable({ providedIn: \"root\" })
export class ClientService {
  getProfile(): User | null {
    return null;
  }
}
""",
    'report.service.ts': """import { Injectable } from \"@angular/core\";
import { Report } from \"../models/report.model\";

@Injectable({ providedIn: \"root\" })
export class ReportService {
  getReports(): Report[] {
    return [];
  }
}
""",
    'wallet.service.ts': """import { Injectable } from \"@angular/core\";
import { Wallet } from \"../models/wallet.model\";

@Injectable({ providedIn: \"root\" })
export class WalletService {
  getWallet(): Wallet {
    return { balance: 0, currency: \"USD\" };
  }
}
"""
}

models = {
    'user.model.ts': """export type UserRole = \"client\" | \"admin\";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
""",
    'session.model.ts': """export interface Session {
  id: string;
  stationId: string;
  startedAt: string;
  endedAt?: string;
  status: string;
}
""",
    'station.model.ts': """export interface Station {
  id: string;
  name: string;
  location: string;
  available: boolean;
}
""",
    'pillar.model.ts': """export interface Pillar {
  id: string;
  name: string;
  stationId: string;
  status: string;
}
""",
    'report.model.ts': """export interface Report {
  id: string;
  title: string;
  date: string;
  summary: string;
}
""",
    'wallet.model.ts': """export interface Wallet {
  balance: number;
  currency: string;
}
"""
}

guards = {
    'auth.guard.ts': """import { inject, Injectable } from \"@angular/core\";
import { CanActivate, Router } from \"@angular/router\";
import { AuthService } from \"../services/auth.service\";

@Injectable({ providedIn: \"root\" })
export class AuthGuard implements CanActivate {
  canActivate(): boolean {
    const auth = inject(AuthService);
    const router = inject(Router);

    if (!auth.isAuthenticated()) {
      router.navigate([\"/auth/login\"]);
      return false;
    }
    return true;
  }
}
""",
    'admin.guard.ts': """import { inject, Injectable } from \"@angular/core\";
import { CanActivate, Router } from \"@angular/router\";
import { AuthService } from \"../services/auth.service\";

@Injectable({ providedIn: \"root\" })
export class AdminGuard implements CanActivate {
  canActivate(): boolean {
    const auth = inject(AuthService);
    const router = inject(Router);

    if (auth.userRole !== \"admin\") {
      router.navigate([\"/client/dashboard\"]);
      return false;
    }
    return true;
  }
}
""",
    'client.guard.ts': """import { inject, Injectable } from \"@angular/core\";
import { CanActivate, Router } from \"@angular/router\";
import { AuthService } from \"../services/auth.service\";

@Injectable({ providedIn: \"root\" })
export class ClientGuard implements CanActivate {
  canActivate(): boolean {
    const auth = inject(AuthService);
    const router = inject(Router);

    if (auth.userRole !== \"client\") {
      router.navigate([\"/admin/dashboard\"]);
      return false;
    }
    return true;
  }
}
"""
}

write(app / 'app.routes.ts', routes)
write(app / 'auth' / 'login.page.ts', login)
write(app / 'auth' / 'register.page.ts', register)
write(app / 'scan' / 'qr-scan.page.ts', scan)

for section, pages in {'client': ['dashboard', 'sessions', 'stations', 'pillars', 'reports', 'wallet'], 'admin': ['dashboard', 'pillars', 'stations', 'sessions', 'clients', 'reports', 'wallet']}.items():
    for page in pages:
        class_name = ''.join(part.capitalize() for part in (section + ' ' + page).split()) + 'Page'
        title = f'{section.capitalize()} {page.capitalize()}'
        content = page_base.replace('__SELECTOR__', f'app-{page}') \
            .replace('__TITLE__', title) \
            .replace('__DESCRIPTION__', f'This is the {title} page for Charg-E {section} users.') \
            .replace('__LINK__', f'/{section}/dashboard') \
            .replace('__LINK_TEXT__', f'{section} dashboard') \
            .replace('__CLASS_NAME__', class_name)
        write(app / section / f'{page}.page.ts', content)

for name, content in services.items():
    write(app / 'services' / name, content)

for name, content in models.items():
    write(app / 'models' / name, content)

for name, content in guards.items():
    write(app / 'guards' / name, content)

print('Project files rewritten.')
