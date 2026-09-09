import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { ClientGuard } from './guards/client.guard';
import { AccountCreationGuard } from './guards/account-creation.guard';

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
        canActivate: [AccountCreationGuard],
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
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
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
    canActivate: [AuthGuard],
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
