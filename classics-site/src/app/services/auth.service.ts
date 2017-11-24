import { Injectable } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import * as firebase from 'firebase/app';

import { User } from '../interfaces/user.interface';

@Injectable()
export class AuthService {
  userId: string;
  user: Observable<firebase.User>;
  userDetails: User;

  userIdChange: Subject<string> = new Subject<string>();
  userDetailsChange: Subject<User> = new Subject<User>();

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) {
    this.user = this.afAuth.authState;
    this.user.subscribe((user) => {
      if (user) {
        this.storeId(user.uid);

        this.db.object(`/users/${user.uid}`).subscribe((snapshot) => {
            this.storeDetails(snapshot);
        });
      }
    });
  }

  createUser(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  createUserDetails(email: string, userId: string) {
    this.userDetails = {
      email: email,
      isAdmin: false
    };

    this.storeId(userId);

    return firebase.database().ref(`users/${userId}`).set(this.userDetails);
  }

  storeId(id: string) {
    this.userId = id;
    this.userIdChange.next(this.userId);
  }

  storeDetails(userDetails: User) {
    this.userDetails = userDetails;
    this.userDetailsChange.next(this.userDetails);
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
