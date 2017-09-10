import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: Observable<firebase.User>;
  userDetails: FirebaseObjectObservable<any>;

  constructor(
    private afAuth: AngularFireAuth, private db: AngularFireDatabase) {
    this.user = this.afAuth.authState;

    this.user.subscribe((user) => {
      if (user) {
        this.userDetails = db.object('/users/' + user.uid);
        this.userDetails.subscribe(
          (snapshot) => {
            console.log('user is signed in');
          },
          (error) => {
            console.log('user is not signed in');
          }
        );
      }
    },
    (error) => {
      console.log('error connecting');
      console.log(error);
    });
   }

  ngOnInit() {
    // this.userDetails.subscribe((userDetails) => {
    //   console.log(userDetails);
    // });
  }

  toggleNavBar() {
    const navbarContent = document.querySelector('#navbar');
    navbarContent.classList.toggle('collapse');
  }
}
