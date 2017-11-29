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
  selectedQuestion: number;
  questionCount: number = 0;
  answeredQuestions: number[] = [];
  unansweredQuestions: number[];


  randomise: boolean = false;

  constructor(private gapFillService: GapFillService) { }

  ngOnInit() {
    this.gapFillQuestions = this.gapFillService.getChosenGapFills();
    console.log(this.gapFillQuestions);
    // for (var i = 0; i < this.gapFillQuestions.length; i++) {
    //   this.unansweredQuestions.push(i);
    // }

    if (this.randomise) {
      this.selectedQuestion = Math.round(Math.random()*this.unansweredQuestions.length -1);
    }
    else {
      this.selectedQuestion = 0;
    }
  }

  onAnsweredQuestion(event) {
    console.log(event);
    this.questionCount++;

    this.answeredQuestions.push(this.unansweredQuestions[this.selectedQuestion]);
    this.unansweredQuestions.splice(this.selectedQuestion);

    this.selectedQuestion = Math.round(Math.random()*this.unansweredQuestions.length -1);
  }

}
