import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AnswerFilterPipe } from '../../../pipes/answer-filter.pipe';

import { QuizDataService } from '../../../services/quiz-data.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  quiz: String;
  quizData: any;
  currentQuestion = 0;
  answeredQuestions = [];
  correctAnswers = 0;
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
        const quizIndex = params['quiz'];

        this.quizData = this.quizDataService.getQuizData(quizIndex);
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
        console.log(this.answeredQuestions);

      }
    );
  }

  onAnswerQuestion(questionIndex, selectedAnswerIndex) {
    if (questionIndex == this.currentQuestion) {
      this.currentQuestion++;
      this.answeredQuestions[questionIndex].answeredIndex = selectedAnswerIndex;
      console.log(questionIndex, selectedAnswerIndex);

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
}
