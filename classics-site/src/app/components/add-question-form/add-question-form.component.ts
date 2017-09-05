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
  addNewForm: FormGroup;
  constructor(private dbService: QuizDatabaseService) { }

  ngOnInit() {
    this.initAddForm();
  }

  private initAddForm() {
    let book = '';
    let question = '';
    let answers = new FormArray([
      new FormGroup({
        'answer': new FormControl('')
      })
    ]);
    let correctAnswer = '';
    let explanation = '';

    this.addNewForm = new FormGroup({
      'book': new FormControl(book, Validators.required),
      'question': new FormControl(question, Validators.required),
      'answers': answers,
      'correctAnswer': new FormControl(correctAnswer, Validators.required),
      'explanation': new FormControl(explanation),
    });
  }

  private onAddAnswer() {
    (<FormArray>this.addNewForm.get('answers')).push(new FormGroup({
      'answer': new FormControl(null, Validators.required)
    }));
  }

  private onRemoveAnswer() {
    (<FormArray>this.addNewForm.get('answers')).removeAt((<FormArray>this.addNewForm.get('answers')).length-1);
  }

  private onSubmitNewQuestion(form: NgForm) {
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

    // TODO: visual feedback on success/fail
    this.dbService.addNewQuestion(book, quizQuestion)
    .then(() => {

    })
    .catch((error) => {
      console.log(error);
    });

  }

}
