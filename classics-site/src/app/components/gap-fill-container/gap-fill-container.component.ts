import { Component, OnInit } from '@angular/core';

import { GapFill } from '../../interfaces/gap-fill.interface';
import { GapFillAnswers } from '../../interfaces/gap-fill-answers.interface';

import { GapFillService } from '../../services/gap-fill.service';
import { Observable } from 'rxjs/Observable';

import { Router, ActivatedRoute } from '@angular/router';

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

  showNextButton:boolean = false;
  showFinishButton:boolean = false;


  constructor(private gapFillService: GapFillService, private router: Router, private route: ActivatedRoute) { }

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
    this.gapFillService.getStudentAnswers(answers.course).subscribe((data) => {
      let highestScore = 0;
      for (let i = 0; i < data.length; i++) {
        if (data[i].exercise == this.gapFillQuestions[this.selectedQuestion].exercise && data[i].percentage > highestScore) {
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
    if (this.selectedQuestion < this.gapFillQuestions.length - 1) {
      this.showNextButton = true;
    }
    else {
      this.showFinishButton = true;
    }
  }

  onRetryQuestion(event) {
    this.showNextButton = false;
    this.showFinishButton = false;

    this.highestScore = null;

    this.selectedQuestion--;
    this.selectedQuestion++;
  }

  onShowNextGapFill() {
    this.showNextButton = false;
    this.selectedQuestion++;
    this.highestScore = null;
  }

  onFinished() {
    this.router.navigate(['/']);
  }

}
