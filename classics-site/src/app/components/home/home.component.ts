import { Component, OnInit } from '@angular/core';
import { QuizDatabaseService } from '../../services/quiz-database.service';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  quizzes = [];
  user: Observable<firebase.User>;
  userDetails: FirebaseObjectObservable<any>;


  constructor(
    private dbService: QuizDatabaseService,
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase) {
      this.user = this.afAuth.authState;

      this.user.subscribe((user) => {
        if (user) {
          this.userDetails = db.object('/users/' + user.uid);
          this.userDetails.subscribe(
            (snapshot) => {
              console.log('user is signed in');
              this.getQuizzes();
            },
            (error) => {
              console.log('user not signed in');
              console.log(error);
            }
          );
        }
      },
      (error) => {
        console.log('user subscribe error');
        console.log(error);
      });
    }

  ngOnInit() {
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
