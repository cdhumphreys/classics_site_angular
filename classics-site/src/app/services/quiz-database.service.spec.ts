import { TestBed, inject } from '@angular/core/testing';

import { QuizDatabaseService } from './quiz-database.service';

describe('QuizDatabaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuizDatabaseService]
    });
  });

  it('should be created', inject([QuizDatabaseService], (service: QuizDatabaseService) => {
    expect(service).toBeTruthy();
  }));
});
