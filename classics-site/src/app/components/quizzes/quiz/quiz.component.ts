import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute, Params } from '@angular/router';
import { AnswerFilterPipe } from '../../../pipes/answer-filter.pipe';

import { QuizDataService } from '../../../services/quiz-data.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  quiz: String;
  quizIndex: number;
  quizData: any;
  currentQuestion = 0;
  answeredQuestions = [];
  correctAnswers = 0;
  showEndScreen = false;

  constructor(
    private route: ActivatedRoute,
    private quizDataService: QuizDataService
  ) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        // this.quiz = 'Book ' + quizData[params['quiz']].book;
        // this.questions = quizData[params['quiz']]['questions'];
        this.quizIndex = params['quiz'];
        const data = this.quizDataService.getQuizData(this.quizIndex);
        this.quizData = data.questions;

        this.quiz = `Book ${data.book}`;
        console.log(this.quizData);
        for (let questionIndex = 0; questionIndex < this.quizData.length; questionIndex++) {
          let answeredQuestionEntry = {
            correct: null,
            correctIndex: null,
            answeredIndex: null,
            answerClasses: []
          };

          for (let property in this.quizData[questionIndex]) {
            if (property.includes('correct') && this.quizData[questionIndex][property] == 1) {
              let correctIndex = parseInt(property.split('_')[1]) - 1;
              answeredQuestionEntry.correctIndex = correctIndex;
            }
            if (property.includes('answer')) {
              answeredQuestionEntry.answerClasses.push('none');
            }
          }

          this.answeredQuestions.push(answeredQuestionEntry);
        }

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
      this.quizDataService.setStudentAnswers(this.quizIndex, this.answeredQuestions);
    }

  }
}
