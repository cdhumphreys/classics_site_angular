import { Component, OnInit, OnChanges, Input } from '@angular/core';
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

  averageScores = {};

  @Input() course;

  constructor(private gapFillService: GapFillService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getGapFills();
  }

  ngOnChanges() {
    this.gapFills = this.sections = [];
    this.getGapFills();
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
            let section = this.gapFills[gapFillIndex].exercise;
            if (this.sections.indexOf(section) == -1) {
              this.sections.push(section);
            }
          }

          for (let i = 0; i < this.sections.length; i++) {
            this.gapFillService.getStudentAnswers(this.course.toLowerCase()).subscribe((data) => {
              // let highestScore = 0;
              // for (let j = 0; j < data.length; j++) {
              //   if (data[j].exercise == this.sections[i] && data[j].percentage > highestScore) {
              //     highestScore = data[j].percentage;
              //   }
              // }
              let sectionCount = 0;
              let total = data
              .filter(element => element.exercise == this.sections[i])
              .map((element) => {
                  sectionCount++;
                  return element.percentage;
              })
              .reduce((total, percentage) => {
                return total + percentage;
              }, 0);
              console.log(total/sectionCount);
              this.averageScores[this.sections[i]] = Math.round(total/sectionCount);
            });
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
      return this.selectedSections.includes(element.exercise);
    });

    this.gapFillService.updateSelectedGapFills(gapFills);
    this.gapFillService.setRandomise(this.randomiseGapFills);

    this.router.navigate(['./gapFill'], {relativeTo: this.route});
  }


  getSectionColour(section) {
    const averageScore = this.averageScores[section];

    if (averageScore == 0) {
      return null;
    }
    else if (averageScore > 0 && averageScore < 60) {
      return 'section-red';
    }
    else if (averageScore >= 60 && averageScore < 75) {
      return 'section-amber';
    }
    else if (averageScore >= 75 && averageScore < 100) {
      return 'section-green';
    }
  }
}
