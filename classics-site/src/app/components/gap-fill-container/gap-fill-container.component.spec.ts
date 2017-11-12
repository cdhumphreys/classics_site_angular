import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GapFillContainerComponent } from './gap-fill-container.component';

describe('GapFillContainerComponent', () => {
  let component: GapFillContainerComponent;
  let fixture: ComponentFixture<GapFillContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GapFillContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GapFillContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
