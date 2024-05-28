import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private authService: AuthService) { }

    async getUsers(): Promise<any[]> {
        return fetch('https://andaluciadescubre.usuariozombie.com/auth/users').then(response => response.json());
    }

    getUser(): any {
        return {
            name: 'Usuario Zombie',
            email: 'usu@zombrex.com',
            age: 22,
            role: 'admin'
        };
    }

    logout(): void {
        this.authService.logout();
    }
}
