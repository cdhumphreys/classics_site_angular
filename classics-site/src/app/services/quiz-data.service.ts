import { Injectable } from '@angular/core';
import quizData from '../data/questions';

@Injectable()
export class QuizDataService {
  constructor() {}

  getQuizData(index: number) {
    return quizData[index]['questions'];
  }
}
