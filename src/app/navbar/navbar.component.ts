import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public isLogged: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isLogged = this.authService.isAuthenticated();
  }

}