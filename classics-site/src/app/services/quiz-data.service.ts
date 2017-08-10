import { Injectable } from '@angular/core';
import quizData from '../data/questions';

@Injectable()
export class QuizDataService {
  studentAnswers = {};
  constructor() {}

  getQuizData(index: number) {
    const bookQuiz = {
      book: quizData[index].book,
      questions: quizData[index]['questions']
    };
    return bookQuiz;
  }

  setStudentAnswers(quiz, studentAnswers) {
    this.studentAnswers[quiz] = studentAnswers;
  }

  getStudentAnswers(quiz) {
    return this.studentAnswers[quiz];
  }
}
