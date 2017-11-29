import { Component, OnInit } from '@angular/core';

import { CategorySidebarComponent } from '../category-sidebar/category-sidebar.component';
import { GapFillDisplayComponent } from '../gap-fill-display/gap-fill-display.component';


@Component({
  selector: 'day-at-races',
  templateUrl: './day-at-races.component.html',
  styleUrls: ['./day-at-races.component.css']
})
export class DayAtRacesComponent implements OnInit {

  selectedCategory: string = '';
  selectedTask: string = '';

  constructor() { }

  ngOnInit() {
  }


  onSelectTask(chosenTask: any) {
    this.selectedCategory = chosenTask.category;
    this.selectedTask = chosenTask.task;
  }



}
