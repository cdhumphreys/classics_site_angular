import { Component, OnInit } from '@angular/core';

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
  user: Observable<firebase.User>;
  userDetails: FirebaseObjectObservable<any>;


  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase
  ) {
      this.user = this.afAuth.authState;

      this.user.subscribe((user) => {
        if (user) {
          this.userDetails = db.object('/users/' + user.uid);
          this.userDetails.subscribe(
            (snapshot) => {
              console.log('user is signed in');
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

}
