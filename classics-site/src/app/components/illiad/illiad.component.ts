import { Component, OnInit } from '@angular/core';

import { QuizDatabaseService } from '../../services/quiz-database.service';

import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-illiad',
  templateUrl: './illiad.component.html',
  styleUrls: ['./illiad.component.css']
})
export class IlliadComponent implements OnInit {
  quizzes = [];


  constructor(
    private dbService: QuizDatabaseService
  ) {}

  ngOnInit() {
    this.getQuizzes();
  }

  private getQuizzes() {
    this.dbService.getQuizzes().subscribe((snapshot) => {
      for (let i = 0; i < snapshot.length; i++) {
        this.quizzes.push({book: snapshot[i].$key});
      }
    },
    (error) => {
      console.log(error);
    });
  }
}
