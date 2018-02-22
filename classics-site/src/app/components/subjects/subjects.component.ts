import { Component, OnInit } from '@angular/core';
import { RouterLinkActive } from '@angular/router';

@Component({
  selector: 'subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onToggleOptions(event) {

    const exerciseList = event.target.parentElement.querySelector('ul');
    if (exerciseList) {
      exerciseList.classList.toggle('hidden');
    }

  }

}
