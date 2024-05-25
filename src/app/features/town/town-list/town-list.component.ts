import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-town-list',
    templateUrl: './town-list.component.html',
    styleUrls: ['./town-list.component.scss']
})

export class TownListComponent {

    @Input() towns: any[] = [];
}
