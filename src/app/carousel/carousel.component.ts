import { Component, OnInit } from '@angular/core';
import { TownService } from '../core/town.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  public towns: any[] = [];

  constructor(private townService: TownService) { }

  async ngOnInit() {
    this.towns = await this.townService.getRandomTowns(3);
  }

}
