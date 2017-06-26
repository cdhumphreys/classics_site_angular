import { Component, OnInit } from '@angular/core';
// import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';
import { ActivatedRoute, Params } from '@angular/router';

import { AnswerFilterPipe } from '../../../pipes/answer-filter.pipe';

import quizData from '../../../data/questions';



@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  quiz: String;
  questions: any;
  answeredQuestions = [];
  currentQuestion = 0;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.quiz = "Book " + quizData[params['quiz']].book;
        this.questions = quizData[params['quiz']]["questions"];

        for (let i = 0; i < this.questions.length; i++) {
          this.answeredQuestions.push({
            answered: false,
            correct: null,
            correctIndex: null
          });
        }
      }
    );
  }

  onAnswerQuestion(questionIndex, answerIndex) {
    if(this.answeredQuestions[questionIndex].answered) {
      return;
    }
    else {
      this.currentQuestion++;
      let correctAnswerIndex = null;
      let answeredCorrectly = false;

      for (let property in this.questions[questionIndex]) {
        if (property.includes('correct') && this.questions[questionIndex][property] == 1) {
          correctAnswerIndex = parseInt(property.split('_')[1]);
          if (answerIndex == correctAnswerIndex) {
            answeredCorrectly = true;
          }
        }
      }
      console.log(answeredCorrectly, correctAnswerIndex);
      this.answeredQuestions[questionIndex] = {
        answered: true,
        correct: answeredCorrectly,
        correctAnswerIndex
      };
    }
  }
}
