import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/user.service';

@Component({
    selector: 'app-app-admin',
    templateUrl: './app-admin.component.html',
    styleUrl: './app-admin.component.scss'
})
export class AppAdminComponent {

    public user: any;
    public menuItems: any[];

    constructor(private userService: UserService, private router: Router) {
        this.user = userService.getUser();

        this.menuItems = [
            { route: '/admin/dashboard', title: 'Dashboard', icon: 'house', show: this.user.role === 'admin' },
            { route: '/admin/towns', title: 'Towns', icon: 'map', show: true },
        ];
    }

    logout(): void {
        this.userService.logout();
        this.router.navigate(['/login']);
    }
}
