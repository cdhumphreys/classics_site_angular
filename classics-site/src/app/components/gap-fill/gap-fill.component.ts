import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
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
  reviewClasses = {};

  translationInputs = []

  reviewActive: boolean = false;
  score: string;

  @Input() gapFillQuestion;
  @Output() onAnswered = new EventEmitter<any>();
  @Output() onRetryQuestion = new EventEmitter<any>();

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

  removePunctuation(word: string) {
    const strippedPunctuation = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    const removedExtraSpaces = strippedPunctuation.replace(/\s{2,}/g," ");

    return removedExtraSpaces;
  }

  onBack() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onClear(form: NgForm) {
    form.reset();
    this.reviewClasses = {};
    this.reviewActive = false;
    this.score = null;
  }

  onSubmitAnswers(form: NgForm) {
    this.reviewActive = true;
    let answers = form.value;

    const formattedCorrectAnswers = this.translationArray.map((element) => {
      return this.removePunctuation(element.toLowerCase().trim());
    });


    let correctAnswers = 0;
    for (let answer in answers) {
      let index = parseInt(answer.split('_')[1]);
      if (answers[answer].toLowerCase().trim() == formattedCorrectAnswers[index]) {
        correctAnswers++;
        this.reviewClasses[answer] = 'correct';
      }
      else {
        this.reviewClasses[answer] = 'incorrect';
      }
    }

    const date = new Date();

    const percentage = Math.round(correctAnswers/Object.keys(form.controls).length * 100);
    this.score = percentage + '%';

    const studentAnswers = {
      course: this.gapFillQuestion.course,
      exercise: this.gapFillQuestion.exercise,
      percentage: percentage,
      date: date.toUTCString()
    };

    this.onAnswered.emit(studentAnswers);
  }

  onArrowPress(event) {
    this.translationInputs = Array.prototype.slice.call(document.querySelectorAll('.translationInput'));

    const currentFocussedInputIndex = this.translationInputs.indexOf(event.target);

    const nextInputIndex = currentFocussedInputIndex == this.translationInputs.length - 1 ? 0 : currentFocussedInputIndex + 1;
    const previousInputIndex = currentFocussedInputIndex == 0 ? this.translationInputs.length - 1 : currentFocussedInputIndex - 1;

    if (event.key == 'ArrowRight') {
      this.translationInputs[nextInputIndex].focus();
    }
    else if (event.key == 'ArrowLeft') {
      this.translationInputs[previousInputIndex].focus();
    }
  }

  onRetry() {
    this.onRetryQuestion.emit(true);
    this.reviewClasses = {};
    this.reviewActive = false;
    this.score = null;
  }



}
