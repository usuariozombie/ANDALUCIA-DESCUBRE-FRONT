import { Component } from '@angular/core';
import { UserService } from 'src/app/core/user.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

    public users: any[] = [];

    constructor(private userService: UserService) { }

    async ngOnInit() {
        this.users = await this.userService.getUsers();
    }

    getDate(timestamp: number): string {
        const dateInMilliseconds = timestamp * 1000;
        return new Date(dateInMilliseconds).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    }
}
