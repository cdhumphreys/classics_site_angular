import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  quizzes = [
    {book: 1, img: 'images/book_1.png'},
    {book: 2, img: 'images/book_2.png'},
    {book: 3, img: 'images/book_3.png'}
  ];

  constructor() {}

  ngOnInit() {}

}
