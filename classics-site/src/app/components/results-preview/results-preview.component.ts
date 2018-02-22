import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'results-preview',
  templateUrl: './results-preview.component.html',
  styleUrls: ['./results-preview.component.css']
})
export class ResultsPreviewComponent implements OnInit {
  filteredStudents: any[] = [];

  @Input() studentResults;
  @Output() selectedExercise = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {

  }

  onSelectExercise(event, course, exercise) {
    this.selectedExercise.emit({course, exercise});
  }

}
