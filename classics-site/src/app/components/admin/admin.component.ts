import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  selectedOption: string;
  constructor() { }

  ngOnInit() {
  }

  onSelectOption(selectedOption: string, event) {
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
  }

}
