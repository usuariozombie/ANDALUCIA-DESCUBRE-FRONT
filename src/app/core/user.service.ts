import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private authService: AuthService) { }

    async getUsers(): Promise<any[]> {
        const token = this.authService.getToken(); // Obtén el token de acceso
        return fetch('https://andaluciadescubre.usuariozombie.com/auth/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token // Incluye el token en el encabezado de la solicitud
            }
        }).then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            return response.json();
        });
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
        const subject = 'Tu cuenta de Andalucía Descubre ha sido verificada';
        const body = `
        <div style="font-family: Arial, sans-serif; color: #333;">
            <div style="background-color: #00447c; padding: 20px; text-align: center;">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Andalucia.svg/1280px-Andalucia.svg.png" alt="Andalucía Descubre" style="width: 500px;">
            </div>
            <div style="padding: 20px;">
                <h1 style="color: #00447c;">¡Bienvenido a Andalucía Descubre!</h1>
                <p>Nos complace informarte que tu cuenta ha sido <strong>verificada con éxito</strong>. Ahora puedes disfrutar de todos los beneficios y características de nuestro servicio.</p>
                <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en <a href="https://example.com/contact">contactarnos</a>.</p>
            </div>
            <div style="background-color: #f7f7f7; padding: 20px; text-align: center; color: #777;">
                <p>Síguenos en nuestras redes sociales:</p>
                <p>
                    <a href="https://www.facebook.com/AndaluciaJunta/?locale=es_ES" style="margin: 0 10px;"><img src="https://upload.wikimedia.org/wikipedia/commons/c/cd/Facebook_logo_%28square%29.png" alt="Facebook" style="width: 30px;"></a>
                    <a href="https://x.com/AndaluciaJunta" style="margin: 0 10px;"><img src="https://img.freepik.com/vector-premium/nuevo-vector-logotipo-twitter-x-vector-signo-twitter-x_952796-6.jpg" alt="Twitter" style="width: 30px;"></a>
                    <a href="https://www.instagram.com/andaluciajunta/" style="margin: 0 10px;"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Instagram-Icon.png/1200px-Instagram-Icon.png" alt="Instagram" style="width: 30px;"></a>
                </p>
                <img src="https://csirc.ugr.es/sites/centros/csirc/public/inline-images/Logo-junta-andalucia-europa-pie-pagina-1024x341-1_0.png" alt="Andalucía Descubre footer" style="width: 400px;">
                <p>&copy; 2024 Andalucía Descubre. Todos los derechos reservados.</p>
                <p><a href="https://example.com/unsubscribe" style="color: #777;">Darse de baja</a></p>
            </div>
        </div>
        `;

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
