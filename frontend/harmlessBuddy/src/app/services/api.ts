import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private djangoURL = 'http://127.0.0.1:8000/';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(public httpClient: HttpClient) {}

  get(route: string): Observable<any> {
    return this.httpClient.get(this.djangoURL + route + '/');
  }
}
