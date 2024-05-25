import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TownCardComponent } from './town-card.component';

describe('TownCardComponent', () => {
  let component: TownCardComponent;
  let fixture: ComponentFixture<TownCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TownCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TownCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
