import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: Observable<firebase.User>;
  auth_user_not_found = false;
  auth_email_in_use = false;
  auth_weak_password = false;
  auth_wrong_password = false;

  // items: FirebaseListObservable<any[]>;
  // msgVal: string = '';

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase) {
    // this.items = af.list('/messages', {
    //   query: {
    //     limitToLast: 50
    //   }
    // });

    this.user = this.afAuth.authState;

  }

  ngOnInit() {
  }


  createUser(form: NgForm) {
    this.resetFlags();
    console.log('create user');

    const email = form.value.email;
    const password = form.value.password;

    firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
      console.log(error);

      if (error["code"] == "auth/email-already-in-use") {
        this.auth_email_in_use = true;
      }
      else if (error["code"] == "auth/weak-password") {
        this.auth_weak_password = true;
      }

    });
  }

  login(form: NgForm) {
    this.resetFlags();
    console.log('login user');

    const email = form.value.email;
    const password = form.value.password;

    this.afAuth.auth.signInWithEmailAndPassword(email, password).catch((error) => {
      console.log(error);

      if (error["code"] == "auth/user-not-found") {
        this.auth_user_not_found = true;
      }
      else if (error["code"] == "auth/wrong-password") {
        this.auth_wrong_password = true;
      }
    });
  }

  resetPassword(form: NgForm) {
    this.resetFlags();
    console.log('reset pw');
    const email = form.value.email;

    this.afAuth.auth.sendPasswordResetEmail(email).catch((error) => {
      console.log(error);

      if (error["code"] == "auth/user-not-found") {
        this.auth_user_not_found = true;
      }
    });
  }

  logout() {
    console.log('logout');
    this.afAuth.auth.signOut();
  }

  resetFlags() {
    this.auth_user_not_found = false;
    this.auth_wrong_password = false;
    this.auth_email_in_use = false;
    this.auth_weak_password = false;
  }

}
