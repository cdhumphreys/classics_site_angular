import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, NgForm } from '@angular/forms';
import { QuizDatabaseService } from '../../services/quiz-database.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  selectedOption: string;

  addNewForm: FormGroup;
  editForm: FormGroup;
  constructor(private dbService: QuizDatabaseService) { }

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

    this.addNewForm = new FormGroup({
      'book': new FormControl(book, Validators.required),
      'question': new FormControl(question, Validators.required),
      'answers': answers,
      'correctAnswer': new FormControl(correctAnswer, Validators.required),
      'explanation': new FormControl(explanation),
    });
  }

  onAddAnswer() {
    (<FormArray>this.addNewForm.get('answers')).push(new FormGroup({
      'answer': new FormControl(null, Validators.required)
    }));
  }

  onRemoveAnswer() {
    (<FormArray>this.addNewForm.get('answers')).removeAt((<FormArray>this.addNewForm.get('answers')).length-1);
  }

  onSubmitNewQuestion(form: NgForm) {
    let book = form.value.book;
    let question = form.value.question;
    let answers = form.value.answers;
    let correctAnswer = parseInt(form.value.correctAnswer);

    let explanation = form.value.explanation.trim();
  }

  onSubmitEditQuestion(form: NgForm) {

  }

}
