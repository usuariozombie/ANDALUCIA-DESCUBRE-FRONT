import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private baseUrl = 'https://andaluciadescubre.usuariozombie.com';

    constructor(private http: HttpClient) { }

    register(userData: any): Observable<any> {
        console.log('Registrando usuario...');
        return this.http.post<any>(`${this.baseUrl}/auth/register`, userData);
    }

    login(userData: any): Observable<any> {
        console.log('Iniciando sesión...');
        return this.http.post<any>(`${this.baseUrl}/auth/login`, userData);
    }

    saveToken(token: string): void {
        this.setCookie('jwt_token', token, 30);
    }

    getToken(): string | null {
        return this.getCookie('jwt_token');
    }

    deleteToken(): void {
        this.setCookie('jwt_token', '', -1);
    }

    isAuthenticated(): boolean {
        const token = this.getToken();
        return token !== null;
    }

    // Función para cerrar sesión
    logout(): void {
        this.deleteToken();
    }

    private setCookie(name: string, value: string, days: number, path: string = '/'): void {
        let expires = '';
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = `; expires=${date.toUTCString()}`;
        }
        document.cookie = `${name}=${value || ''}${expires}; path=${path}`;
    }

    private getCookie(name: string): string | null {
        const nameEQ = `${name}=`;
        const ca = document.cookie.split(';');
        for (const c of ca) {
            let trimmedC = c.trim();
            if (trimmedC.startsWith(nameEQ)) return trimmedC.substring(nameEQ.length);
        }
        return null;
    }
}
