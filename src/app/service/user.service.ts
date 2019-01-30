import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from "../model/user";
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }
  baseUrl: string = `${environment.apiUrl}`

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/user/me`)
  }
}