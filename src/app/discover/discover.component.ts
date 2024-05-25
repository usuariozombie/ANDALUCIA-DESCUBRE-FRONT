import { Component, OnInit } from '@angular/core';
import { TownService } from '../core/town.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrl: './discover.component.scss'
})
export class DiscoverComponent implements OnInit {
  public towns: any[] = [];

  constructor(private townService: TownService) { }

  async ngOnInit() {
    this.towns = await this.townService.getTowns();
  }
}
