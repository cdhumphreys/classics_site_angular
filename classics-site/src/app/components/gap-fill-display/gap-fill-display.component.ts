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
  @Input() category;

  constructor(private dbService: GapFillService) { }

  ngOnInit() {
    this.getGapFills();
  }

  getGapFills() {
    this.dbService.getGapFillTexts().subscribe(
      (snapshot) => {
        console.log(snapshot);
        if (snapshot.length == 0) {
          return;
        }
        else {
          this.gapFills = snapshot.filter((element) => {
            return element.category.toLowerCase() == this.category.toLowerCase();
          });
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
