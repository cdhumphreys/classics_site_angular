import { Component, OnInit } from '@angular/core';
import { FormsModule, Validators, NgForm } from '@angular/forms';

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

  questionKey: string;


  successNotification = false;
  failureNotification = false;

  constructor(private dbService: QuizDatabaseService) { }

  ngOnInit() {}

  public onChooseEditBook($event) {
    let chosenBook = parseInt($event.target.value);

    this.dbService.getQuestions(chosenBook).subscribe((snapshot) => {
      // Clear current questions
      this.editQuestion.questions = [];
      this.editQuestion.selectedQuestionIndex = 0;

      for (let i = 0; i < snapshot.length; i++) {
        this.editQuestion.questions.push(snapshot[i]);
      }

    }, (error) => {
      console.log(error);
      this.failureNotification = true;
    });
  }

  public onSubmitEditQuestion() {
    const bookQuestion = this.editQuestion.questions[this.editQuestion.selectedQuestionIndex];

    const question = bookQuestion.question;
    const answers = bookQuestion.answers;
    const correct = parseInt(bookQuestion.correct);
    const explanation = bookQuestion.explanation;
    const key = bookQuestion.$key;

    console.log(bookQuestion);


    let quizQuestion: QuizQuestion = {
      question,
      answers,
      correct,
      explanation
    };


    this.dbService.editQuestion(key, quizQuestion)
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

  public trackByAnswer(index: number, answer:any) {
    return answer.answer;
  }

  public onAddAnswer() {
    this.editQuestion.questions[this.editQuestion.selectedQuestionIndex].answers.push({answer: ''});
  }

  public onRemoveAnswer($event, index) {
    if (index <= this.editQuestion.questions[this.editQuestion.selectedQuestionIndex].correct) {
      this.editQuestion.questions[this.editQuestion.selectedQuestionIndex].correct -= 1;
    }
    this.editQuestion.questions[this.editQuestion.selectedQuestionIndex].answers.splice(index,1);
  }

  public onDeleteQuestion() {
    this.dbService.deleteQuestion(this.editQuestion.book, this.editQuestion.questions[this.editQuestion.selectedQuestionIndex].$key);
  }

}
