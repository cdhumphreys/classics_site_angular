import { Component, OnInit } from '@angular/core';
import { QuizDatabaseService } from '../../services/quiz-database.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  quizzes = [];

  constructor(private dbService: QuizDatabaseService) {}

  ngOnInit() {
    this.dbService.getQuizzes().subscribe((snapshot) => {
      console.log(snapshot);

      for (var i = 0; i < snapshot.length; i++) {
        this.quizzes.push({book: snapshot[i].$key});
      }
    },
  (error) => {
    console.log(error);
  })
  }

}
