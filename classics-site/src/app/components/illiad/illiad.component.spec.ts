import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IlliadComponent } from './illiad.component';

describe('IlliadComponent', () => {
  let component: IlliadComponent;
  let fixture: ComponentFixture<IlliadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IlliadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IlliadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
