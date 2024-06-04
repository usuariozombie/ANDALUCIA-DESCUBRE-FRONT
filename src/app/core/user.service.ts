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

    public deleteUser(userID: any): Promise<Response> {
        return fetch('https://andaluciadescubre.usuariozombie.com/auth/user/' + userID, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.authService.getToken()
            },
            body: JSON.stringify(userID)
        });
    }

    public sendVerificationEmail(to_email: string): Promise<Response> {
        const subject = 'Your account has been verified';
        const body = '<strong>Your account has been successfully verified!</strong>';

        return fetch('https://andaluciadescubre.usuariozombie.com/auth/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.authService.getToken()
            },
            body: JSON.stringify({ to_email, subject, body })
        });
    }

    public logout(): void {
        this.authService.logout();
    }
}
