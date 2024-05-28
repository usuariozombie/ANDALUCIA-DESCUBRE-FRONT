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

  constructor(private userService: UserService, private router: Router) {
    this.user = userService.getUser();
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
