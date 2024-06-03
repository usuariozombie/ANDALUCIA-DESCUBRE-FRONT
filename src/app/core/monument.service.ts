import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonumentService {
  private baseUrl = 'https://andaluciadescubre.usuariozombie.com/api/towns';

  constructor(private http: HttpClient) { }

  getMonuments(townId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${townId}/monuments`);
  }

  addMonument(townId: number, monument: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${townId}/monuments`, monument);
  }

  deleteMonument(townId: number, monumentId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${townId}/monuments/${monumentId}`);
  }
}
