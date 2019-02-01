import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = `${environment.apiUrl}/gateway/auth/signin`;

  constructor(private httpClient: HttpClient,
              private router: Router) {
  }

  login(usernameOrEmail: string, password: string): Observable<any> {
    return this.httpClient.post<{ access_token: string }>(this.baseUrl, {'usernameOrEmail': usernameOrEmail, 'password': password});
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  public isAuthenticated(): boolean {
    return this.getStoredToken() !== null && !this.isTokenExpired();
  }

  getStoredToken() {
    return localStorage.getItem('access_token');
  }

  isTokenExpired(): boolean {
    const token = this.getStoredToken();
    const expTime = this.getTokenExpirationTime(token);
    if (!expTime) {
      return true;
    }
    const curTime: number = +(new Date().getTime() / 1000).toFixed();
    return curTime > expTime;
  }

  getTokenExpirationTime(token: string) {
    const decoded = jwt_decode(token);
    if (!decoded || decoded.exp === undefined) {
      return null;
    }
    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return decoded.exp;
  }

}
