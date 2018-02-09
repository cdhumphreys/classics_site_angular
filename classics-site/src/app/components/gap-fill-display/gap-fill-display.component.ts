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

  highestScores = {};

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
              let highestScore = 0;
              for (let j = 0; j < data.length; j++) {
                if (data[j].exercise == this.sections[i] && data[j].percentage > highestScore) {
                  highestScore = data[j].percentage;
                }
              }
              this.highestScores[this.sections[i]] = highestScore;
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
    const highScore = this.highestScores[section];

    if (highScore == 0) {
      return null;
    }
    else if (highScore > 0 && highScore < 50) {
      return 'section-difficulties';
    }
    else if (highScore > 50 && highScore <= 75) {
      return 'section-fair';
    }
    else if (highScore > 75 && highScore < 90) {
      return 'section-good';
    }
    else if (highScore >= 90 && highScore <= 100) {
      return 'section-perfect';
    }
  }
}
