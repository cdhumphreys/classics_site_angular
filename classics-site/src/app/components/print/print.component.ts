import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { QuizDataService } from '../../services/quiz-data.service';

import { AnswerFilterPipe } from '../../pipes/answer-filter.pipe';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {
  studentAnswers: any;
  quizQuestions: any;
  quiz: string;

  constructor(
    private quizDataService: QuizDataService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      const quizIndex = params['quizIndex'];
      const data = this.quizDataService.getQuizData(quizIndex);
      this.studentAnswers = this.quizDataService.getStudentAnswers(quizIndex);
      this.quizQuestions = data.questions;
      this.quiz = `Book ${data.book}`;

      console.log(this.quizQuestions);
      console.log(this.studentAnswers);
    });



  }

}
