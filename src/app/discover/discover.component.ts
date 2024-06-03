import { Component, OnInit } from '@angular/core';
import { TownService } from '../core/town.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit {
  public towns: any[] = [];
  public filteredTowns: any[] = [];
  public searchTerm: string = '';
  public selectedProvince: string = '';
  public loading: boolean = true;
  public uniqueProvince: string[] = [];

  constructor(private townService: TownService) { }

  async ngOnInit() {
    try {
      this.towns = await this.townService.getTowns();
      this.filteredTowns = this.towns.filter(town => town.townVisibility == 1);
      this.uniqueProvince = [...new Set(this.towns.map(town => town.townProvince).filter(province => province))];
    } catch (error) {
      console.error("Error loading towns", error);
    } finally {
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    }
  }

  filterTowns() {
    this.filteredTowns = this.towns.filter(town => {
      const matchesSearch = this.searchTerm ?
        (town.townName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          town.townDescription.toLowerCase().includes(this.searchTerm.toLowerCase())) : true;

      const matchesProvince = this.selectedProvince ? town.townProvince === this.selectedProvince : true;

      return town.townVisibility == 1 && matchesSearch && matchesProvince;
    });
  }
}
