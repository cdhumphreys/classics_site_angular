import { Component, OnInit } from '@angular/core';
import { GapFill } from '../../interfaces/gap-fill.interface';
import { GapFillService } from '../../services/gap-fill.service';

@Component({
  selector: 'add-gap-fill',
  templateUrl: './add-gap-fill.component.html',
  styleUrls: ['./add-gap-fill.component.css']
})
export class AddGapFillComponent implements OnInit {
  model: GapFill = {
    category: '',
    gapFillName: '',
    latinText: '',
    englishText: '',
    translatableWords: []
  };

  canUploadData: boolean = false;

  //To generate the hoverable spans for words after removing punctuation
  parsedEnglishText: string[];

  textsSaved: boolean = false;

  // Database feedback
  successNotification:boolean = false;
  failureNotification:boolean = false;

  //DOM elements
  latinTextArea: any;
  englishTextArea: any;
  gapFillNameInput: any;
  gapFillCategory: any;


  constructor(private gapfillService: GapFillService) { }

  ngOnInit() {
    this.latinTextArea = document.querySelector('#latin');
    this.englishTextArea = document.querySelector('#english');
    this.gapFillNameInput = document.querySelector('#gapFillName');
    this.gapFillCategory = document.querySelector('#category');
  }

  public clearInputs() {
    this.gapFillNameInput.value = this.latinTextArea.value = this.englishTextArea.value = '';

    this.model.gapFillName = this.model.latinText = this.model.englishText = '';
    this.model.translatableWords = [];

    this.textsSaved = false;
    this.canUploadData = false;


  }

  public onSaveTexts(englishText: string) {
    this.textsSaved = true;

    // remove non-words
    const regex = /([\_\+\-\.\,\!\@\?\#\$\%\^\&\*\(\)\;\\\/|<>"'\d])/g;
    let filteredText = englishText.replace(regex, '');
    console.log(filteredText);

    this.parsedEnglishText = filteredText.split(' ');

    const searchableText = this.parsedEnglishText.map((word) => {
      return word.toLowerCase();
    })

    this.model.translatableWords = this.model.translatableWords.filter((word) => {
      if (searchableText.includes(word)) {
        return true;
      }
      else {
        return false;
      }
    });

    this.checkFormValidity();


  }

  public onEditTexts() {
    this.textsSaved = false;
    this.canUploadData = false;
  }

  public onSelectTranslatableWord(event: any) {
    const selectedWord = event.target.innerText.toLowerCase();

    if (!this.model.translatableWords.includes(selectedWord)) {
      this.model.translatableWords.push(selectedWord);
    }

    this.canUploadData = true;
  }

  public onRemoveTranslatableWord(event: any) {
    const selectedWord = event.target.innerText;

    const index = this.model.translatableWords.indexOf(selectedWord);
    this.model.translatableWords.splice(index, 1);

    if (this.model.translatableWords.length == 0) {
      this.canUploadData = false;
    }
  }

  public checkFormValidity() {
    this.canUploadData = (this.latinTextArea.classList.contains('ng-valid') &&
    this.englishTextArea.classList.contains('ng-valid') &&
    this.gapFillNameInput.classList.contains('ng-valid') &&
    this.gapFillCategory.classList.contains('ng-valid') &&
    this.model.translatableWords.length > 0 &&
    this.textsSaved);
  }

  public uploadNewGapFill() {
    this.gapfillService.addGapFillText(this.model)
    .then((data) => {
      this.successNotification = true;
      this.clearInputs();

      setTimeout(() => {
        this.successNotification = false;
      }, 3000);
    })
    .catch((error) => {
      this.failureNotification = true;

      setTimeout(() => {
        this.failureNotification = false;
      }, 3000);
    });


  }

}
