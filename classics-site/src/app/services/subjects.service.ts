import { Injectable } from '@angular/core';


@Injectable()
export class SubjectsService {

  subjects: any = {
    'iliad': {
      exercises: []
    },
    'germanicus-and-piso': {
      exercises: ['gap-fill']
    },
    'day-at-the-races': {
      exercises: ['gap-fill']
    },
    'propertius-tibullus-and-ovid': {
      exercises: ['gap-fill']
    }
  };


  constructor() {}

  getSubjectExercises(subject: string) {
    if (this.subjects[subject]) {
      return this.subjects[subject].exercises;
    }
    return null;

  }

  getSubjectName(subjectSlug: string) {
      switch (subjectSlug) {
        case 'iliad':
          return 'Iliad';

        case 'germanicus-and-piso':
          return 'Germanicus & Piso';

        case 'day-at-the-races':
          return 'Day at the Races';

        case 'propertius-tibullus-and-ovid':
          return 'Propertius, Tibullus & Ovid';
      }
  }
  getSlug(subject: string) {
      switch (subject) {
        case 'Iliad':
          return 'iliad';

        case 'Germanicus & Piso':
          return 'germanicus-and-piso';

        case 'Day at the Races':
          return 'day-at-the-races';

        case 'Propertius, Tibullus & Ovid':
          return 'propertius-tibullus-and-ovid';
      }
  }
}
