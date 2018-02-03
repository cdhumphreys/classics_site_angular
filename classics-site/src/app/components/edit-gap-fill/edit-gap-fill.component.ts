import { Component, OnInit } from '@angular/core';
import { GapFill } from '../../interfaces/gap-fill.interface';
import { GapFillService } from '../../services/gap-fill.service';
import { SubjectsService } from '../../services/subjects.service';

@Component({
  selector: 'app-edit-gap-fill',
  templateUrl: './edit-gap-fill.component.html',
  styleUrls: ['./edit-gap-fill.component.css']
})
export class EditGapFillComponent implements OnInit {
  model: GapFill = {
    course: '',
    exercise: '',
    latinText: '',
    englishText: '',
    translatableWords: []
  };

  courses: string[] = [
    'Germanicus & Piso',
    'Day at the Races',
    'Propertius, Tibullus & Ovid'
  ];

  exercises: string[] = [];

  gapFills = [];
  chosenGapFillKey: string = '';
  duplicate: boolean = false;
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
  course: any;
  exercise: any;




  constructor(private gapFillService: GapFillService, private subjectsService: SubjectsService) { }

  ngOnInit() {
    this.latinTextArea = document.querySelector('#latin');
    this.englishTextArea = document.querySelector('#english');
    this.course = document.querySelector('#course');
    this.exercise = document.querySelector('#exercise');

    this.gapFillService.getGapFillTexts().subscribe(
      (snapshot) => {
        this.gapFills = snapshot;
      },
      (error) => {

      }
    );
  }

  public onChooseCourse(event) {
    this.clearInputs();
    this.model.course = event.target.value;
    this.exercises = [];

    this.gapFillService.getGapFillTexts().subscribe(
      (snapshot) => {
        this.gapFills = snapshot;
      },
      (error) => {

      }
    );

    this.gapFills = this.gapFills.filter((gapFill) => {
      return gapFill.course == this.subjectsService.getSlug(this.model.course);
    });

    for (let i = 0; i < this.gapFills.length; i++) {
      let gapFillExercise = this.gapFills[i].exercise;

      if (!this.exercises.includes(gapFillExercise)) {
        this.exercises.push(gapFillExercise);
      }
    }
  }

  public onChooseExercise(event) {
    this.model.exercise = event.target.value;
    let chosenGapFill;
     for (let i = 0; i< this.gapFills.length; i++) {
       let gapFill = this.gapFills[i];
       if (gapFill.course == this.subjectsService.getSlug(this.model.course) && gapFill.exercise == this.model.exercise) {
         chosenGapFill = gapFill;
         this.chosenGapFillKey = gapFill.$key;
       }
     }

     if (chosenGapFill) {
        this.model.latinText = chosenGapFill.latinText;
        this.model.englishText = chosenGapFill.englishText;
        this.model.translatableWords = chosenGapFill.translatableWords;
     }
     else {
       console.log('no gap fill found');
       this.clearInputs();
     }
  }

  public clearInputs() {
    // this.startLineInput.value = this.endLineInput.value = 0;
    this.model.course = '';
    this.model.exercise = '';
    this.latinTextArea.value = this.englishTextArea.value = '';

    this.model.latinText = this.model.englishText = '';
    this.model.translatableWords = [];

    this.textsSaved = false;
    this.canUploadData = false;

  }

  public onSaveTexts(englishText: string) {
    this.textsSaved = true;

    // remove non-words
    const regex = /([\_\+\-\.\,\!\@\?\#\$\%\^\&\*\(\)\;\\\/|<>"'\d])/g;
    let filteredText = englishText.replace('\n', ' ').replace(regex, '');

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

    this.checkFormValidity();
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
    console.log('checking validity');
    this.canUploadData = (this.latinTextArea.classList.contains('ng-valid') &&
    this.englishTextArea.classList.contains('ng-valid') &&
    this.course.classList.contains('ng-valid') &&
    this.exercise.classList.contains('ng-valid') &&
    (this.model.translatableWords.length > 0) &&
    this.textsSaved);
  }

  public updateGapFill() {
    const gapFill: GapFill = {
      course: this.subjectsService.getSlug(this.model.course),
      exercise: this.model.exercise.trim(),
      latinText: this.model.latinText.trim(),
      englishText: this.model.englishText.trim(),
      translatableWords: this.model.translatableWords
    };

    this.gapFillService.updateGapFillText(this.chosenGapFillKey, gapFill)
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
