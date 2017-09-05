import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQuestionFormComponent } from './edit-question-form.component';

describe('EditQuestionFormComponent', () => {
  let component: EditQuestionFormComponent;
  let fixture: ComponentFixture<EditQuestionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditQuestionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditQuestionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
