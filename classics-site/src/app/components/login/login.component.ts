import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router'
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user.interface';
// import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  userId: string;
  userDetails: User;
  emailRegEx: RegExp;

  userIdSubscription: Subscription;
  userDetailsSubscription: Subscription;

  auth_user_not_found = false;
  auth_email_in_use = false;
  auth_weak_password = false;
  auth_wrong_password = false;
  auth_too_many_attempts = false;

  // items: FirebaseListObservable<any[]>;
  // msgVal: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.emailRegEx = new RegExp('(@bedmod.co.uk)\w*');

    this.userIdSubscription = this.authService.userId.subscribe((userId) => {
      this.userId = userId;
      console.log(this.userId);
    });
    this.userDetailsSubscription = this.authService.userDetails.subscribe((userDetails) => {
      this.userDetails = userDetails;
      console.log(this.userDetails);
    });
  }


  createUser(form: NgForm) {
    this.resetFlags();
    console.log('create user');

    const email = form.value.email;
    const password = form.value.password;

    this.authService.createUser(email, password)
    .then((user) => {
      this.authService.createUserDetails(email, user.uid);
    })
    .catch((error) => {
      console.log(error);
      if (error["code"] == "auth/email-already-in-use") {
        this.auth_email_in_use = true;
      }
      else if (error["code"] == "auth/weak-password") {
        this.auth_weak_password = true;
      }
    });
  }

  loginUser(form: NgForm) {
    this.resetFlags();
    console.log('login user');

    const email = form.value.email;
    const password = form.value.password;

    this.authService.login(email, password)
    .then(() => {
      this.router.navigate(['/subjects']);
    })
    .catch((error) => {
      console.log(error);
      if (error["code"] == "auth/user-not-found") {
        this.auth_user_not_found = true;
      }
      else if (error["code"] == "auth/wrong-password") {
        this.auth_wrong_password = true;
      }
      else if (error["code"] == "auth/too-many-requests") {
        this.auth_too_many_attempts = true;
      }
    });
  }


  resetPassword(form: NgForm) {
    this.resetFlags();
    console.log('reset pw');
    const email = form.value.email;

    this.authService.resetPassword(email)
    .catch((error) => {
      console.log(error);
      if (error["code"] == "auth/user-not-found") {
        this.auth_user_not_found = true;
      }
    });
  }

  logout() {
    console.log('logout');
    this.authService.signout();
  }

  resetFlags() {
    this.auth_user_not_found = false;
    this.auth_wrong_password = false;
    this.auth_email_in_use = false;
    this.auth_weak_password = false;
    this.auth_too_many_attempts = false;
  }

  ngOnDestroy() {
    this.userIdSubscription.unsubscribe();
    this.userDetailsSubscription.unsubscribe();
  }


}
