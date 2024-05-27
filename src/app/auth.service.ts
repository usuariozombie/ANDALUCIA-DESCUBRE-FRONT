import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://andaluciadescubre.usuariozombie.com';

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    console.log('Registrando usuario...');
    return this.http.post<any>(`${this.baseUrl}/auth/register`, userData);
  }

  login(userData: any): Observable<any> {
    console.log('Iniciando sesión...');
    return this.http.post<any>(`${this.baseUrl}/auth/login`, userData);
  }

  // Función para guardar el token JWT en el localStorage
  saveToken(token: string): void {
    localStorage.setItem('jwt_token', token);
  }

  // Función para obtener el token JWT del localStorage
  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  // Función para borrar el token JWT del localStorage
  deleteToken(): void {
    localStorage.removeItem('jwt_token');
  }

  // Función para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    const token = this.getToken();
    return token !== null;
  }

  // Función para cerrar sesión
  logout(): void {
    this.deleteToken();
  }
}
