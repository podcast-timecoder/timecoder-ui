import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import {PatronList} from "../model/patron.list";

@Injectable({
  providedIn: 'root'
})
export class PatronService {
  constructor(private http: HttpClient) { }
  baseUrl: string = `${environment.apiUrl}`

  getPatronList(): Observable<PatronList> {
    return this.http.get<PatronList>(`${this.baseUrl}/patrons`)
  }

  clearPatronsCaches() {
    this.http.get<PatronList>(`${this.baseUrl}/clearPatronsCaches`)
  }
}
