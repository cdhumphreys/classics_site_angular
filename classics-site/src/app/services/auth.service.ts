import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

import { User } from '../interfaces/user.interface';

@Injectable()
export class AuthService {
  userId: string;
  user: Observable<firebase.User>;
  userDetails: User;

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) {
    this.user = this.afAuth.authState;
    this.user.subscribe((user) => {
      if (user) {
        this.userId = user.uid;
        this.db.object(`/users/${user.uid}`).subscribe((snapshot) => {
            this.userDetails = snapshot;
        });
      }
    });
  }



}
