import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthService } from '../../services/auth.service';

// import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userId: string;
  userDetails: User;
  userIdSubscription: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // this.userDetails.subscribe((userDetails) => {
    //   console.log(userDetails);
    // });

    this.userId = this.authService.userId;
    this.userDetails = this.authService.userDetails;

    this.userIdSubscription = this.authService.userIdChange.subscribe((userId) => {
      this.userId = userId;
    });

    console.log(this.userId, this.userDetails);
  }

  toggleNavBar() {
    const navbarContent = document.querySelector('#navbar');
    navbarContent.classList.toggle('collapse');
  }

  ngOnDestroy() {
    this.userIdSubscription.unsubscribe();
  }
}
