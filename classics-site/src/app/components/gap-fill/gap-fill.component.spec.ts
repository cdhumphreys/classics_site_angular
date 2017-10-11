import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GapFillComponent } from './gap-fill.component';

describe('GapFillComponent', () => {
  let component: GapFillComponent;
  let fixture: ComponentFixture<GapFillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GapFillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GapFillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
