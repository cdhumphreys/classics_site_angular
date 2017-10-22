import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GermanicusComponent } from './germanicus.component';

describe('GermanicusComponent', () => {
  let component: GermanicusComponent;
  let fixture: ComponentFixture<GermanicusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GermanicusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GermanicusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
