import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { GapFillDisplayComponent } from '../gap-fill-display/gap-fill-display.component';

import { SubjectsService } from '../../services/subjects.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  subjectTitle: string;
  subject: string;
  exercises: string[];
  selectedExercise: string = '';

  constructor(private route: ActivatedRoute, private subjectsService: SubjectsService) { }

  ngOnInit() {
    this.route.paramMap
    .subscribe((params) => {
      this.subject = params.get('subject');

      this.subjectTitle = this.subject == 'germanicus and piso' ? 'Germanicus & Piso' : this.subject;

      this.exercises = this.subjectsService.getSubjectExercises(this.subject);

      console.log(this.exercises);
      this.selectedExercise = '';
    });



  }

  ngOnChanges() {
    this.selectedExercise = '';
  }

  onSelectExercise(exercise: string) {
    this.selectedExercise = exercise;
  }

}