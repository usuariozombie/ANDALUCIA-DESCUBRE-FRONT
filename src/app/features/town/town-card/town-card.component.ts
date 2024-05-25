import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-town-card',
  templateUrl: './town-card.component.html',
  styleUrl: './town-card.component.scss'
})
export class TownCardComponent {
  @Input() town: any;
}
