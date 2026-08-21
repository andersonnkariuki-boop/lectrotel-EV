import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, tap } from "rxjs";
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
    return this.http.post<AuthResponse>(`${this.url}auth/login`, { email, password }).pipe(
      tap((response) => {
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('currentUser', JSON.stringify(response.user));
        this.userSubject.next(response.user);
        this.tokenSubject.next(response.token);
      })
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

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    this.userSubject.next(null);
    this.tokenSubject.next(null);
    this.router.navigate(["/auth/login"]);
  }

  isAuthenticated(): boolean {
    return !!this.userSubject.getValue();
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
}
