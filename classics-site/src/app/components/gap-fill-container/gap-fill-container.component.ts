import { Component, OnInit } from '@angular/core';

import { GapFill } from '../../interfaces/gap-fill.interface';
import { GapFillAnswers } from '../../interfaces/gap-fill-answers.interface';

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

  failureNotification: boolean = false;
  successNotification: boolean = false;

  highestScore: number;


  constructor(private gapFillService: GapFillService) { }

  ngOnInit() {
    this.gapFillQuestions = this.gapFillService.getChosenGapFills();
    this.highestScore = null;
    if (this.gapFillQuestions) {
      this.gapFillQuestions.map((question) => {
        this.exercises.push(question.exercise);
      });
    }
  }

  onAnsweredQuestion(answers: GapFillAnswers) {
    console.log(answers);
    this.gapFillService.getStudentAnswers(answers.course, answers.exercise).subscribe((data) => {
      let highestScore = 0;
      for (let i = 0; i < data.length; i++) {
        if (data[i].percentage > highestScore) {
          highestScore = data[i].percentage;
        }
      }
      this.highestScore = highestScore;
    });

    this.gapFillService.uploadStudentAnswers(answers)
    .then(() => {
      this.successNotification = true;

      setTimeout(() => {
        this.successNotification = false;
      }, 2000);
    })
    .catch((error) => {
      console.log(error);

      this.failureNotification = true;

      setTimeout(() => {
        this.failureNotification = false;
      }, 2000);
    });

  }

}
