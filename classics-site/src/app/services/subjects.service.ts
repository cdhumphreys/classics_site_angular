import { Injectable } from '@angular/core';


@Injectable()
export class SubjectsService {

  subjects: any = {
    'illiad': {
      exercises: ['quiz']
    },
    'germanicus and piso': {
      exercises: ['gap-fill']
    },
    'day at the races': {
      exercises: ['gap-fill']
    }
  };

  constructor() {}

  getSubjectExercises(subject: string) {
    console.log(subject);
    if (this.subjects[subject]) {
      return this.subjects[subject].exercises;
    }
    return null;

  }
}
