import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthService } from '../../services/auth.service';

import { User } from '../../interfaces/user.interface';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userId: string;
  userDetails: User;

  userIdSub: Subscription;
  userDetailsSub: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userIdSub = this.authService.userId.subscribe((userId) => {
      this.userId = userId;
    });
    this.userDetailsSub = this.authService.userDetails.subscribe((userDetails) => {
      this.userDetails = userDetails;
    });
  }

  toggleNavBar() {
    const navbarContent = document.querySelector('#navbar');
    navbarContent.classList.toggle('collapse');
  }

  ngOnDestroy() {
    this.userIdSub.unsubscribe();
    this.userDetailsSub.unsubscribe();
  }
}
