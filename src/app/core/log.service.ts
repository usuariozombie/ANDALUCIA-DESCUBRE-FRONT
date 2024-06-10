import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private logsUrl = environment.baseUrl + '/auth/logs';

  constructor(private http: HttpClient) { }

  getLogs(token: string): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any[]>(this.logsUrl, { headers });
  }
}
