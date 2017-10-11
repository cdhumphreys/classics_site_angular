import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGapFillComponent } from './add-gap-fill.component';

describe('AddGapFillComponent', () => {
  let component: AddGapFillComponent;
  let fixture: ComponentFixture<AddGapFillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGapFillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGapFillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
