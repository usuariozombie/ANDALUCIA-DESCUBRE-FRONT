import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://andaluciadescubre.usuariozombie.com';

  constructor(private http: HttpClient) {}

  private getCsrfToken(): Observable<any> {
    return this.http.get(`${this.baseUrl}/csrf-token`, { withCredentials: true });
  }

  register(userData: any): Observable<any> {
    return this.getCsrfToken().pipe(
      switchMap((csrfResponse: any) => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfResponse.csrf_token
        });
        return this.http.post<any>(`${this.baseUrl}/auth/register`, userData, { headers, withCredentials: true });
      })
    );
  }

  login(userData: any): Observable<any> {
    return this.getCsrfToken().pipe(
      switchMap((csrfResponse: any) => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfResponse.csrf_token
        });
        return this.http.post<any>(`${this.baseUrl}/auth/login`, userData, { headers, withCredentials: true });
      })
    );
  }
}
