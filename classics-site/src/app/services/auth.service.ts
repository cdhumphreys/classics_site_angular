import { Injectable } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

import * as firebase from 'firebase/app';

import { User } from '../interfaces/user.interface';

@Injectable()
export class AuthService {
  userId: string;
  user: Observable<firebase.User>;
  userDetails: Observable<User>;

  userIdChange: Subject<string> = new Subject<string>();

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) {
    this.user = this.afAuth.authState;
    this.userDetails = this.afAuth.authState
    .switchMap(user => {
      if (user) {
        this.storeId(user.uid);
        return this.db.object(`users/${user.uid}`);
      } else {
        return Observable.of(null);
      }
    });
  }

  createUser(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  createUserDetails(email: string, userId: string) {
    const userDetails = {
      email: email,
      isAdmin: false
    };

    return firebase.database().ref(`users/${userId}`).set(userDetails);
  }

  storeId(id: string) {
    this.userId = id;
    this.userIdChange.next(this.userId);
  }

  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signout() {
    this.afAuth.auth.signOut();
  }

  resetPassword(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

}
