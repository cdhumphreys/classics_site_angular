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
    book: 0,
    questions: [],
    selectedQuestionIndex: 0
  };

  successNotification = false;
  failureNotification = false;

  constructor(private dbService: QuizDatabaseService) { }

  ngOnInit() {
  }

  private onChooseEditBook($event) {
    let chosenBook = parseInt($event.target.value);

    this.dbService.getQuestions(chosenBook).subscribe((snapshot) => {
      console.log(snapshot);

      // Clear current questions
      this.editQuestion.questions = [];
      this.editQuestion.selectedQuestionIndex = 0;

      for (let i = 0; i < snapshot.length; i++) {
        this.editQuestion.questions.push(snapshot[i]);
      }
    }, (error) => {
      console.log(error);
    });
  }

  private onSubmitEditQuestion(form: NgForm) {
    // TODO: set form values into quizQuestion object with interface then update database question using service
    let book = form.value.book;
    let question = form.value.question;
    let answers = form.value.answers;
    let correct = parseInt(form.value.correctAnswer);

    let explanation = form.value.explanation.trim();


    let quizQuestion: QuizQuestion = {
      question,
      answers,
      correct,
      explanation
    };

    // clear all fields except book field
    form.reset({
      book
    });

    this.dbService.editQuestion(book, this.editQuestion.selectedQuestionIndex, quizQuestion)
    .then(() => {
      this.successNotification = true;

      setTimeout(() => {
        this.successNotification = false;
      }, 2000);
    })
    .catch((error) => {
      console.log(error);

      this.failureNotification = true;

      setTimeout(() => {
        this.failureNotification = false;
      }, 2000);
    });

  }

  private onDeleteQuestion() {
    // TODO: get question index from form, use service to delete from database
  }

}
