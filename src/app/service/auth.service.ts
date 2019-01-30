import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class AuthService {

  baseUrl: string = `${environment.apiUrl}/auth/signin`;

  constructor(private httpClient: HttpClient,
              private router: Router) { }
  
  login(usernameOrEmail:string, password:string): Observable<any> {
    return this.httpClient.post<{access_token:  string}>(this.baseUrl, {"usernameOrEmail": usernameOrEmail, "password": password})
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  public isAuthenticated(): boolean {
    return localStorage.getItem('access_token') !==  null;
  }
}