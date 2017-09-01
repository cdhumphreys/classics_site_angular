import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators, NgForm } from '@angular/forms';
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

  editQuestion = {
    book: 1,
    questions: [
      {
        question: 'Example question',
        answers: ['answer 1', 'answer 2'],
        correct: 0,
        explanation: 'asdasd'
      },
      {
        question: 'Another Example question',
        answers: ['answer 1', 'answer 2', 'answer 3'],
        correct: 1,
        explanation: 'zxcvb'
      },
    ],
    selectedQuestion: 0
  };


  constructor(private dbService: QuizDatabaseService) { }

  ngOnInit() {
    // this.initForm();
  }

  private onSelectOption(selectedOption: string, event) {
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

    if (selectedOption == 'new') {
      this.initAddForm();
    }
    else if (selectedOption == 'edit') {
      // this.initEditForm();
    }

    this.selectedOption = selectedOption;
    console.log(this.selectedOption);
  }

  private initAddForm() {
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


  private onAddAnswer() {
    (<FormArray>this.addNewForm.get('answers')).push(new FormGroup({
      'answer': new FormControl(null, Validators.required)
    }));
  }

  private onRemoveAnswer() {
    (<FormArray>this.addNewForm.get('answers')).removeAt((<FormArray>this.addNewForm.get('answers')).length-1);
  }

  private onSubmitNewQuestion(form: NgForm) {
    let book = form.value.book;
    let question = form.value.question;
    let answers = form.value.answers;
    let correctAnswer = parseInt(form.value.correctAnswer);

    let explanation = form.value.explanation.trim();

    // TODO: set form values into quizQuestion object with interface then send to database using service

  }



  private onChooseEditBook($event) {
    let chosenBook = parseInt($event.target.value);

    this.dbService.getQuestions(chosenBook);
  }

  private onSubmitEditQuestion(form: NgForm) {
    // TODO: set form values into quizQuestion object with interface then update database question using service
  }

  private onDeleteQuestion() {
    // TODO: get question index from form, use service to delete from database
  }

}
