import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

import { QuizQuestion } from '../interfaces/quiz-question.interface';

@Injectable()
export class QuizDatabaseService {
  bookRef: FirebaseListObservable<any>;
  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) { }

  getQuestions(book: number) {
    this.fetchBookData(book);
    return this.bookRef;
  }

  addNewQuestion(book, questionObj: QuizQuestion) {
    this.fetchBookData(book);
    return this.bookRef.push(questionObj);
  }

  editQuestion(book: number, questionIndex: number, questionObj: QuizQuestion) {
    this.fetchBookData(book);
    return this.bookRef.update(String(questionIndex), questionObj);
  }

  deleteQuestion(book:number, questionIndex: number) {
    this.fetchBookData(book);
    this.bookRef.remove(String(questionIndex));
  }

  deleteAllQuestions(book: number) {
    this.fetchBookData(book);
    this.bookRef.remove();
  }

  fetchBookData(book) {
    this.bookRef = this.db.list('/books/' + book);
  }
}
