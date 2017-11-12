import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { GapFill } from '../../interfaces/gap-fill.interface';

import { GapFillService } from '../../services/gap-fill.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'gap-fill',
  templateUrl: './gap-fill.component.html',
  styleUrls: ['./gap-fill.component.css']
})
export class GapFillComponent implements OnInit {
  translationArray: string[] = [];
  submittedTranslation: string[] = [];
  gapTranslation: string[] = [];

  @Input() gapFillQuestion;
  @Output() onAnswered = new EventEmitter<boolean>();



  randomNumbersChosen: number[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.initGapFill();
  }

  ngOnChanges() {
      this.initGapFill();
  }

  initGapFill() {
    this.submittedTranslation = [];
    this.parseGapFill();
  }

  parseGapFill() {
    this.translationArray = this.gapFillQuestion.englishText.split(" ");
    this.substituteTranslation();
  }


  substituteTranslation() {
    const numberOfInputs = Math.floor(this.translationArray.length / 4);
    const inputEntries = this.getUniqueRandoms(this.translationArray.length, numberOfInputs);

    this.gapTranslation = this.translationArray.map((entry, index) => {
      if (inputEntries.includes(index)) {
        return `input=${entry.length + 3}`;
      }
      else {
        return entry;
      }
    });

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

    return chosenNumbers;
  }

  onBack() {
    this.router.navigate(['../dayAtRaces']);
  }

  onSubmitAnswers() {
    this.onAnswered.emit(true);
  }

  onClear() {

  }



}
