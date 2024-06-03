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

    public getUser(): any {
        return this.authService.getUser();
    }

    public updateUser(user: any): Promise<Response> {
        return fetch('https://andaluciadescubre.usuariozombie.com/auth/user/' + user.userID, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.authService.getToken()
            },
            body: JSON.stringify(user)
        });
    }

    public logout(): void {
        this.authService.logout();
    }
}
