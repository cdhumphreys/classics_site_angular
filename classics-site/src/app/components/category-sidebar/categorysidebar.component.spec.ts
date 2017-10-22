import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { categorySidebarComponent } from './category-sidebar.component';

describe('categorySidebarComponent', () => {
  let component: categorySidebarComponent;
  let fixture: ComponentFixture<categorySidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ categorySidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(categorySidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
