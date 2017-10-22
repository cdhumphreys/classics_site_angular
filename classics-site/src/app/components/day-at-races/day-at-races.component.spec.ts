import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayAtRacesComponent } from './day-at-races.component';

describe('DayAtRacesComponent', () => {
  let component: DayAtRacesComponent;
  let fixture: ComponentFixture<DayAtRacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayAtRacesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayAtRacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
