import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { GapFill } from '../interfaces/gap-fill.interface';

// import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Injectable()
export class GapFillService {
  gapFillRef: FirebaseListObservable<any>;
  selectedGapFills: GapFill[];

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) { }

  private fetchGapFillTexts() {
    this.gapFillRef = this.db.list('/gapFills/');

  }

  public getGapFillTexts() {
    this.fetchGapFillTexts();
    return this.gapFillRef;
  }

  public addGapFillText(gapFillData: GapFill) {
    this.fetchGapFillTexts();
    return this.gapFillRef.push(gapFillData);
  }

  public updateSelectedGapFills(gapFills: GapFill[]) {
    this.selectedGapFills = gapFills;
  }

  public getChosenGapFills() {
    return this.selectedGapFills;
  }


}
