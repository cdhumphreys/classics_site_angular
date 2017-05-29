import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import quizData from '../../../data/questions';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  quiz: String;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.quiz = quizData[params['quiz']].book;
      }
    );
  }

}
