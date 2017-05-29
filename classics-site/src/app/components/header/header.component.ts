import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

  toggleNavBar() {
    const navbarContent = document.querySelector('#navbar');
    navbarContent.classList.toggle('collapse');
  }
}
