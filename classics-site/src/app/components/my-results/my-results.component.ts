import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';

import { GapFillService } from '../../services/gap-fill.service';
import { SubjectsService } from '../../services/subjects.service';


@Component({
  selector: 'my-results',
  templateUrl: './my-results.component.html',
  styleUrls: ['./my-results.component.css']
})
export class MyResultsComponent implements OnInit {
  results;
  filteredResults;

  constructor(private gapFillService: GapFillService, private subjectsService: SubjectsService) {}

  ngOnInit() {
    this.gapFillService.getUserResults().subscribe(snapshot => {
      this.results = snapshot.map((element) => {
        return {...element, ...{course: this.subjectsService.getSubjectName(element.course)}, ...{date: new Date(element.date)}};
      }).sort((a, b) => {
        // sort by ascending course
        const nameA = a.course.toUpperCase(); // ignore upper and lowercase
        const nameB = b.course.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // if same course then sort by ascending exercise
        const sectionA = a.exercise.toUpperCase(); // ignore upper and lowercase
        const sectionB = b.exercise.toUpperCase(); // ignore upper and lowercase
        if (sectionA > sectionB) {
          return 1;
        }
        if (sectionA < sectionB) {
          return -1;
        }

        // if same course and section then sort by descending date
        const dateA = a.date;
        const dateB = b.date;

        if (dateA < dateB) {
          return 1;
        }
        if (dateA > dateB) {
          return -1;
        }

        return 0;
      });
      this.filteredResults = this.results;
    });
  }

  onSelectFilter(event) {
    if (event.target.classList.contains('active')) return;

    const siblingNodes = event.target.parentElement.querySelectorAll('.filter');
    const siblings = Array.from(siblingNodes).filter((element) => {
      return element != event.target;
    });

    siblings.map((element: HTMLElement) => {
      element.classList.remove('active');
    });

    event.target.classList.add('active');

    this.filteredResults = this.results.filter((element) => {
      return element.course == event.target.textContent;
    })
  }

  onClearFilter(event) {
    this.filteredResults = this.results;
    const siblingNodes = event.target.parentElement.querySelectorAll('.filter');
    const siblings = Array.from(siblingNodes).map((element: HTMLElement) => {
      element.classList.remove('active');
    });
  }

}
