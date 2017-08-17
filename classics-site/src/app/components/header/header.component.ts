import { Component, OnInit } from '@angular/core';
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

  constructor(public afAuth: AngularFireAuth) {
    this.user = this.afAuth.authState;
   }

  ngOnInit() {
  }

  toggleNavBar() {
    const navbarContent = document.querySelector('#navbar');
    navbarContent.classList.toggle('collapse');
  }
}
