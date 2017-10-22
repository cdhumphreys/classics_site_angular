import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GapFillDisplayComponent } from './gap-fill-display.component';

describe('GapFillDisplayComponent', () => {
  let component: GapFillDisplayComponent;
  let fixture: ComponentFixture<GapFillDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GapFillDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GapFillDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
