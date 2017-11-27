import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';

import { Observable } from 'rxjs/Observable';

import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userDetails: Observable<User>;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userDetails = this.authService.userDetails;
  }

  toggleNavBar() {
    const navbarContent = document.querySelector('#navbar');
    navbarContent.classList.toggle('collapse');
  }
}
