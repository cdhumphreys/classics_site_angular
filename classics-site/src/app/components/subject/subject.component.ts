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
  subjectSlug: string;
  exercises: string[];

  constructor(private route: ActivatedRoute, private subjectsService: SubjectsService) { }

  ngOnInit() {
    this.selectGapFillExercise();
  }


  selectGapFillExercise() {
    this.route.paramMap
    .subscribe((params) => {
      this.subjectSlug = params.get('subject');

      this.subjectTitle = this.subjectsService.getSubjectName(this.subjectSlug);

      this.exercises = this.subjectsService.getSubjectExercises(this.subjectSlug);
    });
  }
}
