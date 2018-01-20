import { Injectable } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';

import * as firebase from 'firebase/app';

import { User } from '../interfaces/user.interface';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;

  userId: BehaviorSubject<string> = new BehaviorSubject<string>('');
  userDetails: BehaviorSubject<User> = new BehaviorSubject<User>({email: null, isAdmin: false});

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) {
    this.user = this.afAuth.authState;

    this.user.switchMap((user) => {
      if (user) {
        this.userId.next(user.uid);
        return this.db.object(`users/${user.uid}`);
      }
      else {
        this.userId.next('');
        return Observable.of(null);
      }
    })
    .subscribe(
      (userDetails) => {
        this.userDetails.next(userDetails);
      },
      (error) => {
        this.userDetails.next({email: null, isAdmin: false});
        console.log('error', error);
      }
    );

  }

  isAuthenticated() {
    return this.user;
  }

  createUser(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  createUserDetails(email: string, userId: string) {
    const userDetails = {
      email: email,
      isAdmin: false
    };

    return this.db.object(`users/${userId}`).set(userDetails);
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
