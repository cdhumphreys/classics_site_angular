import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { GapFill } from '../../interfaces/gap-fill.interface';

import { GapFillService } from '../../services/gap-fill.service';
import { Observable } from 'rxjs/Observable';

import { NgForm } from '@angular/forms';

@Component({
  selector: 'gap-fill',
  templateUrl: './gap-fill.component.html',
  styleUrls: ['./gap-fill.component.css']
})
export class GapFillComponent implements OnInit {
  translationArray: string[] = [];
  submittedTranslation: string[] = [];
  gapTranslation: string[] = [];
  inputEntries: number[];

  @Input() gapFillQuestion;
  @Output() onAnswered = new EventEmitter<any>();

  domInputs: any[];



  randomNumbersChosen: number[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.initGapFill();
  }

  ngOnChanges() {
      this.initGapFill();
  }

  initGapFill() {
    this.submittedTranslation = [];
    this.domInputs = [];
    this.parseGapFill();
  }

  parseGapFill() {
    this.translationArray = this.gapFillQuestion.englishText.split(" ");
    this.substituteTranslation();
  }


  substituteTranslation() {
    const numberOfInputs = Math.floor(this.translationArray.length / 4);
    this.inputEntries = this.getUniqueRandoms(this.translationArray.length, numberOfInputs);

    this.gapTranslation = this.translationArray.map((entry, index) => {
      if (this.inputEntries.includes(index)) {
        return `input=${entry.length + 3}`;
      }
      else {
        return entry;
      }
    });

    this.domInputs = Array.prototype.slice.call(document.querySelectorAll('.translationInput'));

  }

  getUniqueRandoms(max: number, howMany: number) {
    let chosenNumbers = [];

    while (chosenNumbers.length < howMany) {
      let chosenNum = Math.floor(Math.random() * max);
      let numberFound = chosenNumbers.indexOf(chosenNum);

      if (numberFound > -1) {
        continue;
      }
      else {
        chosenNumbers.push(chosenNum);
      }
    }

    return chosenNumbers.sort((a, b) => {
      return a-b;
    });
  }

  onBack() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onSubmitAnswers(form: NgForm) {
    let answers = form.value;
    let correctAnswers = 0;
    for (let answer in answers) {
      let index = parseInt(answer.split('_')[1]);
      if (answers[answer].trim() == this.translationArray[index]) {
        correctAnswers++;
      }
    }
    this.onAnswered.emit({course: this.gapFillQuestion.course, exercise: this.gapFillQuestion.exercise, score: correctAnswers});
  }



}
