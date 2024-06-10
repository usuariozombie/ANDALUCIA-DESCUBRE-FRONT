import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from 'src/enviroment/enviroment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private baseUrl = environment.baseUrl;
    private logoutTimer$ = new Subject<void>();

    constructor(private http: HttpClient, private router: Router) {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.checkTokenExpiration();
            }
        });
    }

    register(userData: any): Observable<any> {
        console.log('Registrando usuario...');
        return this.http.post<any>(`${this.baseUrl}/auth/register`, userData);
    }

    login(userData: any): Observable<any> {
        console.log('Iniciando sesión...');
        return this.http.post<any>(`${this.baseUrl}/auth/login`, userData);
    }

    saveToken(token: string): void {
        this.setCookie('jwt_token', token, 1 / 24); // 1 minuto de duración
        this.startAutoLogout();
    }

    getToken(): string | null {
        return this.getCookie('jwt_token');
    }

    deleteToken(): void {
        this.setCookie('jwt_token', '', -1);
        this.stopAutoLogout();
    }

    isAuthenticated(): boolean {
        const token = this.getToken();
        return token !== null;
    }

    getUser(): any {
        const token = this.getToken();
        if (token) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return {
                email: payload.email,
                role: payload.role,
                townID: payload.townID
            };
        }
        return null;
    }

    isAdmin(): boolean {
        const user = this.getUser();
        return user && user.role === 'admin';
    }

    logout(): void {
        this.deleteToken();
    }

    private startAutoLogout(): void {
        const checkIntervalSeconds = 30; // Intervalo de verificación del token en segundos
        const warningMinutes = 5; // Mostrar aviso cuando queden 5 minutos
        const warningMinutes2 = 1; // Mostrar aviso cuando quede 1 minuto

        timer(0, checkIntervalSeconds * 1000).pipe(
            takeUntil(this.logoutTimer$)
        ).subscribe(() => {
            const token = this.getToken();
            if (token) {
                const payload = JSON.parse(atob(token.split('.')[1]));
                const expirationTime = payload.exp * 1000;
                const currentTime = Date.now();
                const remainingTimeSeconds = Math.floor((expirationTime - currentTime) / 1000);

                if (remainingTimeSeconds <= warningMinutes * 60 && remainingTimeSeconds > (warningMinutes - 1) * 60) {
                    alert('Tu sesión se cerrará en 5 minutos.');
                } else if (remainingTimeSeconds <= warningMinutes2 * 60 && remainingTimeSeconds > (warningMinutes2 - 1) * 60) {
                    alert('Tu sesión se cerrará en 1 minuto.');
                } else if (remainingTimeSeconds <= 0) {
                    this.logout();
                    this.router.navigate(['/']);
                }
            }
        });
    }

    private stopAutoLogout(): void {
        this.logoutTimer$.next();
    }

    private checkTokenExpiration(): void {
        const token = this.getToken();
        if (token) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const expirationTime = payload.exp * 1000;
            const currentTime = Date.now();
            if (currentTime >= expirationTime) {
                this.logout();
                this.router.navigate(['/']);
            }
        }
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
