import { Component, OnInit } from '@angular/core';
import { GapFillService } from '../../services/gap-fill.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-gap-fill',
  templateUrl: './gap-fill.component.html',
  styleUrls: ['./gap-fill.component.css']
})
export class GapFillComponent implements OnInit {
  latinText: string = '';
  translation: string = '';
  translationArray: string[] = [];
  submittedTranslation: string[] = [];
  gapTranslation: string[] = [];

  randomNumbersChosen: number[] = [];


  constructor(private gapfillservice: GapFillService) { }

  ngOnInit() {
    // fetch from db
    this.gapfillservice.getGapFillTexts().subscribe((snapshot) => {
      console.log(snapshot);
    },
  (error) => {
    console.log(error);
  });
    this.latinText = 'Caecilius est in horto, Metella in atrio sedet, Quintus est filius';
    this.translation = 'Caecilius is in the garden, Metella is sitting in the atrium, Quintus is the son';

    this.translationArray = this.translation.split(" ");
    this.substituteTranslation();
  }

  substituteTranslation() {
    const numberOfInputs = Math.floor(this.translationArray.length / 3);
    const inputEntries = this.getUniqueRandoms(this.translationArray.length, numberOfInputs);
    console.log(inputEntries);
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

  onSubmit() {

  }

}
