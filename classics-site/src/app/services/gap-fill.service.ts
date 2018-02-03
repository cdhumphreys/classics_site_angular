import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { GapFill } from '../interfaces/gap-fill.interface';
import { GapFillAnswers } from '../interfaces/gap-fill-answers.interface';

// import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

import { AuthService } from './auth.service';

@Injectable()
export class GapFillService {
  userId: string;
  gapFillRef: FirebaseListObservable<any>;
  selectedGapFills: GapFill[];
  randomiseGapFills: boolean = false;

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private authService: AuthService) {
    this.authService.userId.subscribe((id: string) => {
      this.userId = id;
    });
  }

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

  public updateGapFillText(key: string, gapFillData: GapFill) {
    return this.gapFillRef.set(key, gapFillData);
  }

  public updateSelectedGapFills(gapFills: GapFill[]) {
    this.selectedGapFills = gapFills;
  }

  public getChosenGapFills() {
    if (this.randomiseGapFills) {
      return this.randomiseArray(this.selectedGapFills);
    }
    else {
        return this.selectedGapFills;
    }
  }

  public setRandomise(randomise: boolean) {
    this.randomiseGapFills = randomise;
  }

  public uploadStudentAnswers(answers: GapFillAnswers) {
    return this.db.list(`users/${this.userId}/gapFills/`).push(answers);
  }

  public getStudentAnswers(courseSlug: string, exercise: string) {
    return this.db.list(`users/${this.userId}/gapFills/`);
  }

  randomiseArray(array: any[]) {
    return array.sort((a, b) => {
      return (0.5 - Math.random());
    })
  }

}
