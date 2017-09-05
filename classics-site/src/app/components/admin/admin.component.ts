import { Component, OnInit } from '@angular/core';

import { AddQuestionFormComponent } from '../add-question-form/add-question-form.component';
import { EditQuestionFormComponent } from '../edit-question-form/edit-question-form.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  selectedOption: string;

  constructor() { }

  ngOnInit() {}

  private onSelectOption(selectedOption: string, event) {
    let clickedButton = event.target;
    let siblingsArray = Array.prototype.slice.call(clickedButton.parentElement.childNodes,null);

    let siblings = siblingsArray.filter((element) => {
      if (element.classList) {
        if (element != clickedButton) {
          return element;
        }
      }
    });

    // Add active class to clicked button, remove from the other buttons
    clickedButton.classList.add('active');
    for (var i = 0; i < siblings.length; i++) {
      siblings[i].classList.remove('active');
    }

    this.selectedOption = selectedOption;
    console.log(this.selectedOption);
  }

}
