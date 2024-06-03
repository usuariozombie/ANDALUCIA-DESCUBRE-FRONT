import { Component } from '@angular/core';
import { TownService } from 'src/app/core/town.service';
import { UserService } from 'src/app/core/user.service';

@Component({
    selector: 'app-towns',
    templateUrl: './towns.component.html',
    styleUrl: './towns.component.css'
})
export class TownsComponent {
    public towns: any[] = [];

    constructor(private townService: TownService, private userService: UserService) { }

    async ngOnInit() {
        if (!this.userService.getUser()) {
            return;
        }

        if (this.userService.getUser().role === 'admin') {
            this.towns = await this.townService.getTowns();
        } else {
            this.towns = [await this.townService.getTown(this.userService.getUser().townID)];
        }
    }
}
