import { Component, OnInit } from '@angular/core';

import { GapFill } from '../../interfaces/gap-fill.interface';

import { GapFillService } from '../../services/gap-fill.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'gap-fill-container',
  templateUrl: './gap-fill-container.component.html',
  styleUrls: ['./gap-fill-container.component.css']
})
export class GapFillContainerComponent implements OnInit {
  gapFillQuestions: GapFill[] = [];
  selectedQuestion: number = 0;

  exercises: string[] = [];

  randomise: boolean = false;

  constructor(private gapFillService: GapFillService) { }

  ngOnInit() {
    this.gapFillQuestions = this.gapFillService.getChosenGapFills();
    this.gapFillQuestions.map((question) => {
      this.exercises.push(question.exercise);
    });
  }

  onAnsweredQuestion(answered) {
    console.log(answered);

    // store student answers on db - make new service

  }

}
