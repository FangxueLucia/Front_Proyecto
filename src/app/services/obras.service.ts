import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObrasService {

  private apiUrl1 = 'http://localhost:3000/api/obras1';
  private apiUrl2 = 'http://127.0.0.1:3000/api/obras2';
  private apiUrl3 = 'http://localhost:3000/api/obras3';

  constructor(private http: HttpClient) {}

  getObras1(): Observable<any> {
    return this.http.get<any>(this.apiUrl1);
  }

  getObras2(): Observable<any> {
    return this.http.get<any>(this.apiUrl2);
  }

  getObras3(): Observable<any> {
    return this.http.get<any>(this.apiUrl3);
  }
}
