import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Injectable()
export class QuizDatabaseService {

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) { }

  getQuizData() {
    return this.db.list('/books');
  }
}
