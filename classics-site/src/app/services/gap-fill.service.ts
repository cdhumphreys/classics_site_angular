import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { GapFill } from '../interfaces/gap-fill.interface';

// import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Injectable()
export class GapFillService {
  gapFillRef: FirebaseListObservable<any>;

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) { }

  fetchGapFillTexts() {
    this.gapFillRef = this.db.list('/gapFills/');

  }

  getGapFillTexts() {
    this.fetchGapFillTexts();
    return this.gapFillRef;
  }

  addGapFillText(gapFillData: GapFill) {
    this.fetchGapFillTexts();
    return this.gapFillRef.push(gapFillData);
  }


}
