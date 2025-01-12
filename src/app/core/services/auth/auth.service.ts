import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, Observable, of, tap, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {LoginResponse} from "../../../models/LoginResponse";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userDetails = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
    this.loadUserDetails();
  }

  private loadUserDetails(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const userDetails = localStorage.getItem('userDetails');
      if (userDetails) {
        this.userDetails.next(JSON.parse(userDetails));
      }
    }
  }

  private saveUserDetails(user: any): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('userDetails', JSON.stringify(user));
      this.userDetails.next(user);
    } else {
      console.warn('LocalStorage is not available');
    }
  }

  private clearUserDetails(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('userDetails');
    }
    this.userDetails.next(null);
  }

  login(credentials: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`/api/v1/auth/login`, credentials).pipe(
      tap((response: LoginResponse) => {
        this.saveToken(response.token);
        this.fetchUserDetails().subscribe();
      }),
      catchError((error) => {
        console.error('Login failed:', error);
        return throwError(() => error);
      })
    );
  }

  fetchUserDetails(): Observable<any> {
    return this.http.get('/users/me').pipe(
      tap((user) => {
        this.saveUserDetails(user);
      }),
      catchError((error) => {
        console.error('Failed to fetch user details:', error);
        return throwError(() => error);
      })
    );
  }

  register(user: { email: string; password: string }): Observable<any> {
    return this.http.post(`/api/v1/auth/register`, user);
  }

  saveToken(token: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('authToken', token);
    } else {
      console.warn('LocalStorage is not available');
    }
  }

  getToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('authToken');
    }
    console.warn('LocalStorage is not available');
    return null;
  }

  logout(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('authToken');
    }
    this.clearUserDetails();
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUserDetails(): Observable<any> {
    return this.userDetails.asObservable();
  }

  isAdmin(): boolean {
    const user = this.userDetails.value;
    const isAdmin = user && user.role === 'ADMIN';
    console.log('User is admin:', isAdmin);
    return isAdmin;
  }
}
