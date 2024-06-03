import { Component, OnInit } from '@angular/core';
import { TownService } from '../core/town.service';
import { MonumentService } from '../core/monument.service';
import { DishService } from '../core/dish.service';
import { EventService } from '../core/event.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
    selector: 'app-town',
    templateUrl: './town.component.html',
    styleUrls: ['./town.component.scss']
})
export class TownComponent implements OnInit {

    public town: any;
    public monuments: any[] = [];
    public dishes: any[] = [];
    public events: any[] = [];
    public townMapUrl: SafeResourceUrl | undefined;

    constructor(private townService: TownService,
        private monumentService: MonumentService,
        private dishService: DishService,
        private eventService: EventService,
        private route: ActivatedRoute,
        private sanitizer: DomSanitizer) { }

    async ngOnInit() {
        this.route.paramMap.subscribe(async params => {
            const townId = params.get('id');
            if (townId) {
                await this.loadTown(+townId);
                await this.loadMonuments(+townId);
                await this.loadDishes(+townId);
                await this.loadEvents(+townId);
            }
        });
    }

    async loadTown(townId: number) {
        try {
            this.town = await this.townService.getTown(townId);
            this.townMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.town.townMap);
        } catch (error) {
            console.error('Error fetching town data', error);
        }
    }

    async loadMonuments(townId: number) {
        try {
            const monuments = await this.monumentService.getMonuments(townId).toPromise();
            this.monuments = monuments || [];
        } catch (error) {
            console.error('Error fetching monuments', error);
        }
    }

    async loadDishes(townId: number) {
        try {
            const dishes = await this.dishService.getDishes(townId).toPromise();
            this.dishes = dishes || [];
        } catch (error) {
            console.error('Error fetching dishes', error);
        }
    }

    async loadEvents(townId: number) {
        try {
            const events = await this.eventService.getEvents(townId).toPromise();
            this.events = events || [];
        } catch (error) {
            console.error('Error fetching events', error);
        }
    }
}
