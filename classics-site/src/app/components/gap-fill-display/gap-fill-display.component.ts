import { Component, OnInit, Input } from '@angular/core';

import { GapFillService } from '../../services/gap-fill.service';

import { GapFill } from '../../interfaces/gap-fill.interface';

@Component({
  selector: 'gap-fill-display',
  templateUrl: './gap-fill-display.component.html',
  styleUrls: ['./gap-fill-display.component.css']
})
export class GapFillDisplayComponent implements OnInit {
  gapFills: GapFill[] = [];
  selectedGapFills: number[] = [];
  previews = [];
  @Input() category;

  constructor(private dbService: GapFillService) { }

  ngOnInit() {
    this.getGapFills();
  }

  ngOnChanges() {
    this.getGapFills();
  }

  ngAfterViewChecked() {
    const previews = document.querySelectorAll('.preview');
    this.previews = Array.prototype.slice.call(previews);
    console.log(previews)
    console.log('selected', this.selectedGapFills);
  }

  getGapFills() {
    this.dbService.getGapFillTexts().subscribe(
      (snapshot) => {
        if (snapshot.length == 0) {
          return;
        }
        else {
          this.gapFills = snapshot.filter((element) => {
            return element.category.toLowerCase() == this.category.toLowerCase();
          }).sort((a, b) => {
            return a.startLine - b.startLine;
          });
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSelectExercise(exerciseIndex: number) {
    const indexSearch = this.selectedGapFills.indexOf(exerciseIndex);
    console.log('before', this.selectedGapFills);

    if (indexSearch == -1) {
      this.selectedGapFills.push(exerciseIndex);
    }
    else {
      this.selectedGapFills.splice(indexSearch, 1);
    }

    console.log('after', this.selectedGapFills);


    // toggle selected visuals
    this.previews[exerciseIndex].classList.toggle('selected');
  }

}
