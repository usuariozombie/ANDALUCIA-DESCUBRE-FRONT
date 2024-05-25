import { Component, OnInit } from '@angular/core';
import { TownService } from '../core/town.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-town',
    templateUrl: './town.component.html',
    styleUrl: './town.component.scss'
})
export class TownComponent implements OnInit {

    public town: any;

    constructor(private townService: TownService, private route: ActivatedRoute) { }

    async ngOnInit() {
        this.route.paramMap.subscribe(async params => {
            const townId = params.get('id');
            if (townId) {
                await this.loadTown(+townId);
            }
        });
    }

    async loadTown(townId: number) {
        try {
            this.town = await this.townService.getTown(townId);
        } catch (error) {
            console.error('Error fetching town data', error);
        }
    }
}
