import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators, NgForm } from '@angular/forms';

import { QuizDatabaseService } from '../../services/quiz-database.service';

import { QuizQuestion } from '../../interfaces/quiz-question.interface'

@Component({
  selector: 'edit-question-form',
  templateUrl: './edit-question-form.component.html',
  styleUrls: ['./edit-question-form.component.css']
})
export class EditQuestionFormComponent implements OnInit {
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
