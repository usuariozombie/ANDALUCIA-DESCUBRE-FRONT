import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private logsUrl = 'https://andaluciadescubre.usuariozombie.com/auth/logs';

  constructor(private http: HttpClient) { }

  getLogs(token: string): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any[]>(this.logsUrl, { headers });
  }
}
