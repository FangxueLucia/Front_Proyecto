import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Obra } from '../models/obra';

@Injectable({
  providedIn: 'root',
})
export class ObrasService {
  private apiUrl = 'http://localhost:3000/api/obras';

  constructor(private http: HttpClient) {}

  // Listado paginado -> { results, page, limit, total, totalPages }
  getObras(): Observable<{ results: Obra[] }> {
    return this.http.get<{ results: Obra[] }>(this.apiUrl);
  }

    // Detalle por ID -> Obra directa
    getObraById(id: string): Observable<Obra> {
      return this.http.get<Obra>(`${this.apiUrl}/${id}`);
    }
  }
