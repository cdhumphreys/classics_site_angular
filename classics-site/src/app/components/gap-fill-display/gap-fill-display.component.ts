import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

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
  randomiseGapFills: boolean = false;
  previews = [];

  @Input() course;

  constructor(private gapFillService: GapFillService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getGapFills();
  }

  ngOnChanges() {
    this.getGapFills();
  }

  ngAfterViewChecked() {
    const previews = document.querySelectorAll('.preview');
    this.previews = Array.prototype.slice.call(previews);
  }

  getGapFills() {
    this.gapFillService.getGapFillTexts().subscribe(
      (snapshot) => {
        if (snapshot.length == 0) {
          return;
        }
        else {
          this.gapFills = snapshot.filter((gapFill: GapFill) => {
            return gapFill.course.toLowerCase() == this.course.toLowerCase();
          });
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSelectExercise(exerciseIndex: number) {
    const selectedGapFillsIndex = this.selectedGapFills.indexOf(exerciseIndex);

    if (selectedGapFillsIndex == -1) {
      this.selectedGapFills.push(exerciseIndex);
    }
    else {
      this.selectedGapFills.splice(selectedGapFillsIndex, 1);
    }

    // toggle selected visuals
    this.previews[exerciseIndex].classList.toggle('selected');
  }

  randomiseArray(array: any[]) {
    return array.sort((a, b) => {
      return (0.5 - Math.random());
    })
  }

  onShowGapFills() {
    const gapFills = this.gapFills.filter((element, index) => {
      return this.selectedGapFills.includes(index);
    });

    this.gapFillService.updateSelectedGapFills(gapFills);
    this.router.navigate(['./gapFill'], {relativeTo: this.route});
  }



}
