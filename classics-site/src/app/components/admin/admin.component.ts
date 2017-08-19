import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  selectedOption: string;

  // populate this from db
  books = [1,2,3,4,5];

  questionForm: FormGroup;
  constructor() { }

  ngOnInit() {
    this.initForm();
  }

  onSelectOption(selectedOption: string, event) {
    let clickedButton = event.target;
    let siblingsArray = Array.prototype.slice.call(clickedButton.parentElement.childNodes,null);

      let siblings = siblingsArray.filter((element) => {
        if (element.classList) {
          if (element != clickedButton) {
            return element;
          }
        }
    });

    // Add active class to clicked button, remove from the other buttons
    clickedButton.classList.add('active');
    for (var i = 0; i < siblings.length; i++) {
      siblings[i].classList.remove('active');
    }

    this.selectedOption = selectedOption;
  }

  private initForm() {
    let book = '';
    let question = '';
    let answers = new FormArray([
      new FormGroup({
        'answer': new FormControl('')
      })
    ]);
    let correctAnswer = '';
    let explanation = '';

    if (this.selectedOption == 'edit') {
      // populate with selected question data
    }

    this.questionForm = new FormGroup({
      'book': new FormControl(book, Validators.required),
      'question': new FormControl(question, Validators.required),
      'answers': answers,
      'correctAnswer': new FormControl(correctAnswer, Validators.required),
      'explanation': new FormControl(explanation),
    });
  }

  onAddAnswer() {
    (<FormArray>this.questionForm.get('answers')).push(new FormGroup({
      'answer': new FormControl(null, Validators.required)
    }));
  }

  onRemoveAnswer() {
    (<FormArray>this.questionForm.get('answers')).removeAt((<FormArray>this.questionForm.get('answers')).length-1);
  }

}
