import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute, Params } from '@angular/router';
import { AnswerFilterPipe } from '../../pipes/answer-filter.pipe';

import { QuizDataService } from '../../services/quiz-data.service';
import { QuizDatabaseService } from '../../services/quiz-database.service';

import { QuizQuestion } from '../../interfaces/quiz-question.interface';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  quiz: String;
  book: number;
  quizData: QuizQuestion[];
  currentQuestion = 0;
  answeredQuestions = [
    {
      correct: null,
      correctIndex: 0,
      answeredIndex: null,
      answerClasses: []
    }
  ];
  correctAnswers = 0;
  showEndScreen = false;

  constructor(
    private route: ActivatedRoute,
    private quizDataService: QuizDataService,
    private dbService: QuizDatabaseService
  ) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.book = params['book'];
        this.quiz = `Book ${this.book}`;

        this.dbService.getQuestions(this.book).subscribe(
        (snapshot) => {
          this.quizData = snapshot;
          console.log(snapshot);
          this.answeredQuestions = [];

          for (let questionIndex = 0; questionIndex < this.quizData.length; questionIndex++) {
            let answeredQuestionEntry = {
              correct: null,
              correctIndex: this.quizData[questionIndex].correct,
              answeredIndex: null,
              answerClasses: []
            };

            for (let answers in this.quizData[questionIndex].answers) {
              answeredQuestionEntry.answerClasses.push('none');
            }
            this.answeredQuestions.push(answeredQuestionEntry);
          }

        },
        (error) => {
          console.log(error);
        });
      }
    );
  }

  onAnswerQuestion(questionIndex, selectedAnswerIndex) {
    if (questionIndex == this.currentQuestion) {
      if (this.answeredQuestions[questionIndex].correct != null) {
        return;
      }
      // this.currentQuestion++;
      this.answeredQuestions[questionIndex].answeredIndex = selectedAnswerIndex;

      if (selectedAnswerIndex == this.answeredQuestions[questionIndex].correctIndex) {
        this.answeredQuestions[questionIndex].correct = true;
        this.correctAnswers++;
      }
      else {
        this.answeredQuestions[questionIndex].correct = false;
        this.answeredQuestions[questionIndex].answerClasses[selectedAnswerIndex] = 'answer-wrong';
      }

      this.answeredQuestions[questionIndex].answerClasses[this.answeredQuestions[questionIndex].correctIndex] = 'answer-correct';
    }
  }

  nextQuestion() {
    if (this.currentQuestion < this.answeredQuestions.length - 1) {
      this.currentQuestion++;
    }

    if (this.currentQuestion == this.answeredQuestions.length - 1 && this.answeredQuestions[this.currentQuestion].correct != null) {
      this.showEndScreen = true;
      this.quizDataService.setStudentAnswers(this.book, this.answeredQuestions);
    }

  }
}
