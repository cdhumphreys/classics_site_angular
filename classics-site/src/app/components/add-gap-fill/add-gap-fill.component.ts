import { Component, OnInit } from '@angular/core';
import { Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'add-gap-fill',
  templateUrl: './add-gap-fill.component.html',
  styleUrls: ['./add-gap-fill.component.css']
})
export class AddGapFillComponent implements OnInit {
  model: any;

  textsSaved: boolean = false;
  successNotification:boolean = false;
  failureNotification:boolean = false;

  constructor() { }

  ngOnInit() {
    this.initAddGapFillForm();
  }

  private initAddGapFillForm() {
    this.model = {
      latinText: '',
      englishText: '',
      translatableWords: []
    };
  }

  private onSubmitNewGapFill(addNewGapFillForm: NgForm) {

  }

  private onSaveTexts(latinText: string) {
    console.log(latinText);
    this.textsSaved = true;
  }

  private onEditTexts() {
    this.textsSaved = false;
  }

}
