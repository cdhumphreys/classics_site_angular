import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators, NgForm } from '@angular/forms';

import { QuizDatabaseService } from '../../services/quiz-database.service';

import { QuizQuestion } from '../../interfaces/quiz-question.interface'

@Component({
  selector: 'add-question-form',
  templateUrl: './add-question-form.component.html',
  styleUrls: ['./add-question-form.component.css']
})
export class AddQuestionFormComponent implements OnInit {
  addNewFormGroup: FormGroup;
  addNewForm: NgForm;

  successNotification = false;
  failureNotification = false;

  constructor(private dbService: QuizDatabaseService) { }

  ngOnInit() {
    this.initAddForm();
  }

  private initAddForm() {
    let book = 0;
    let question = '';
    let answers = new FormArray([
      new FormGroup({
        'answer': new FormControl('')
      })
    ]);
    let correctAnswer = '';
    let explanation = '';

    this.addNewFormGroup = new FormGroup({
      'book': new FormControl(book, Validators.required),
      'question': new FormControl(question, Validators.required),
      'answers': answers,
      'correctAnswer': new FormControl(correctAnswer, Validators.required),
      'explanation': new FormControl(explanation),
    });
  }

  public onAddAnswer() {
    (<FormArray>this.addNewFormGroup.get('answers')).push(new FormGroup({
      'answer': new FormControl(null, Validators.required)
    }));
  }

  public onRemoveAnswer() {
    (<FormArray>this.addNewFormGroup.get('answers')).removeAt((<FormArray>this.addNewFormGroup.get('answers')).length-1);
  }

  public onSubmitNewQuestion(form: NgForm) {
    let book = form.value.book;
    let question = form.value.question;
    let answers = form.value.answers;
    let correct = parseInt(form.value.correctAnswer);

    let explanation = form.value.explanation.trim();


    let quizQuestion: QuizQuestion = {
      question,
      answers,
      correct,
      explanation
    };

    // clear all fields except book field
    form.reset({
      book
    });

    this.dbService.addNewQuestion(book, quizQuestion)
    .then(() => {
      this.successNotification = true;

      setTimeout(() => {
        this.successNotification = false;
      }, 2000);
    })
    .catch((error) => {
      console.log(error);

      this.failureNotification = true;

      setTimeout(() => {
        this.failureNotification = false;
      }, 2000);
    });

  }

  get getAddNewFormGroupAnswers() {
    return <FormArray>this.addNewFormGroup.get('answers');
  }

}
