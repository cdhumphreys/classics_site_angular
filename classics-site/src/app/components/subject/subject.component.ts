import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { CategorySidebarComponent } from '../category-sidebar/category-sidebar.component';
import { GapFillDisplayComponent } from '../gap-fill-display/gap-fill-display.component';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  subjectTitle: string;
  selectedCategory: string = '';
  selectedTask: string = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap
    .subscribe((params) => {
      console.log(params);
      this.subjectTitle = params.get('subject');
    });
  }


  onSelectTask(chosenTask: any) {
    this.selectedCategory = chosenTask.category;
    this.selectedTask = chosenTask.task;
  }

}
