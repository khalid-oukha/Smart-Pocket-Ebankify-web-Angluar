import { Injectable } from '@angular/core';
import {catchError, Observable, of, tap, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userDetails: any = null;

  constructor(private http: HttpClient) {}
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`/api/v1/auth/login`, credentials);
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
    this.userDetails = null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUserDetails(): Observable<any> {
    if (this.userDetails) {
      return of(this.userDetails);
    }

    return this.http.get('/users/me').pipe(
      tap((data) => (this.userDetails = data)),
      catchError((error) => {
        console.error('Failed to fetch user details:', error);
        return throwError(() => error);
      })
    );
  }
}
