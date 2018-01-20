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

  sections = [];
  selectedSections = [];

  @Input() course;

  constructor(private gapFillService: GapFillService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getGapFills();
  }

  ngOnChanges() {
    this.getGapFills();
  }

  ngAfterViewChecked() {

  }

  onRandomiseSelect() {
    this.randomiseGapFills = !this.randomiseGapFills;
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

          for (let gapFillIndex in this.gapFills) {
            let section = this.gapFills[gapFillIndex].exercise.split(" ")[1];
            if (this.sections.indexOf(section) == -1) {
              this.sections.push(section);
            }
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSelectSection(event, section) {
    const element = event.target;
    element.classList.toggle('section-selected');

    const sectionIndex = this.selectedSections.indexOf(section);

    if (sectionIndex == -1) {
      this.selectedSections.push(section);
    }
    else {
      this.selectedSections.splice(sectionIndex, 1);
    }
  }

  onShowGapFills() {
    const gapFills = this.gapFills.filter((element) => {
      return this.sections.includes(element.exercise.split(" ")[1]);
    });

    this.gapFillService.updateSelectedGapFills(gapFills);
    this.gapFillService.setRandomise(this.randomiseGapFills);

    this.router.navigate(['./gapFill'], {relativeTo: this.route});
  }



}
