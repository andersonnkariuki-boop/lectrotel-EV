import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, map, tap } from "rxjs";
import { User, UserRole, AuthResponse } from "../models/user.model";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: "root" })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private url = environment.apiUrl;

  private userSubject = new BehaviorSubject<User | null>(null);
  public user = this.userSubject.asObservable();

  private tokenSubject = new BehaviorSubject<string | null>(null);
  public token = this.tokenSubject.asObservable();

  constructor() {
    // Load user from localStorage if exists
    const storedUser = localStorage.getItem('currentUser');
    const storedToken = localStorage.getItem('authToken');
    
    if (storedUser) {
      try {
        this.userSubject.next(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('currentUser');
      }
    }
    
    if (storedToken) {
      this.tokenSubject.next(storedToken);
    }
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<any>(`${this.url}login`, {
      email,
      user_password: password
    }).pipe(
      tap((response) => {
        const user = this.normalizeUser(response);
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.userSubject.next(user);
        this.tokenSubject.next(response.token);
      }),
      map((response) => ({
        token: response.token,
        user: this.normalizeUser(response),
        message: response.message
      }))
    );
  }

  register(name: string, email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.url}auth/register`, { name, email, password }).pipe(
      tap((response) => {
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('currentUser', JSON.stringify(response.user));
        this.userSubject.next(response.user);
        this.tokenSubject.next(response.token);
      })
    );
  }

  createAccount(name: string, email: string, password: string, phone?: string): Observable<{ last_insert_id: number }> {
    const [firstName, ...lastNameParts] = name.trim().split(/\s+/);
    return this.http.post<{ last_insert_id: number }>(
      `${this.url}register`,
      {
        user_name: email,
        first_name: firstName,
        last_name: lastNameParts.join(' ') || firstName,
        email,
        user_password: password,
        role_id: 'Client',
        phone_number: phone || '',
        user_creator: this.getUserId() || 0
      },
      this.jwtHeader()
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    this.userSubject.next(null);
    this.tokenSubject.next(null);
    this.router.navigate(["/auth/login"]);
  }

  isAuthenticated(): boolean {
    return !!this.getToken() && !!this.userSubject.getValue();
  }

  get userRole(): UserRole | null {
    return this.userSubject.getValue()?.role ?? null;
  }

  get currentUser(): User | null {
    return this.userSubject.getValue();
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  jwtHeader() {
    const token = this.getToken();
    return {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
  }

  getUserId(): number | null {
    return this.userSubject.getValue()?.user_id ?? null;
  }

  private normalizeUser(response: any): User {
    const source = response?.user ?? response;
    const role = String(source?.role ?? source?.role_id ?? '').toLowerCase();
    const normalizedRole: UserRole = role === 'super_admin' || role === 'super_admin'
      ? 'super_admin'
      : role === 'charging_pillar_owner' || role === 'owner'
        ? 'owner'
        : role === 'admin'
          ? 'admin'
          : 'client';
    const firstName = source?.first_name ?? '';
    const lastName = source?.last_name ?? '';
    return {
      user_id: Number(source?.user_id ?? source?.id ?? 0),
      name: source?.name ?? (`${firstName} ${lastName}`.trim() || source?.user_name || source?.email || 'User'),
      email: source?.email ?? '',
      role: normalizedRole,
      phone: source?.phone_number ?? source?.phone,
      user_amount: Number(source?.user_amount ?? 0)
    };
  }
}
