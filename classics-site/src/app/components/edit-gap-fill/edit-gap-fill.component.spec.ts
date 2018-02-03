import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGapFillComponent } from './edit-gap-fill.component';

describe('EditGapFillComponent', () => {
  let component: EditGapFillComponent;
  let fixture: ComponentFixture<EditGapFillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditGapFillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGapFillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
