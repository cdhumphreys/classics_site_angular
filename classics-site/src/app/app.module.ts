import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';

import { SubjectsComponent } from './components/subjects/subjects.component';
import { SubjectComponent } from './components/subject/subject.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { LoginComponent } from './components/login/login.component';
import { PrintComponent } from './components/print/print.component';
import { AdminComponent } from './components/admin/admin.component';
import { AddQuestionFormComponent } from './components/add-question-form/add-question-form.component';
import { EditQuestionFormComponent } from './components/edit-question-form/edit-question-form.component';
import { GapFillComponent } from './components/gap-fill/gap-fill.component';
import { AddGapFillComponent } from './components/add-gap-fill/add-gap-fill.component';
import { EditGapFillComponent } from './components/edit-gap-fill/edit-gap-fill.component';
import { IlliadComponent } from './components/illiad/illiad.component';

import { GapFillDisplayComponent } from './components/gap-fill-display/gap-fill-display.component';
import { GapFillContainerComponent } from './components/gap-fill-container/gap-fill-container.component';
import { MyResultsComponent } from './components/my-results/my-results.component';

import { AnswerFilterPipe } from './pipes/answer-filter.pipe';
import { CapitalisePipe } from './pipes/capitalise.pipe';


import { AuthService } from './services/auth.service';
import { QuizDataService } from './services/quiz-data.service';
import { QuizDatabaseService } from './services/quiz-database.service';
import { GapFillService } from './services/gap-fill.service';
import { SubjectsService } from './services/subjects.service';

import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';


import { AngularFireModule } from 'angularfire2';

// New imports to update based on AngularFire2 version 4
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';


import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';




export const firebaseConfig = {
  apiKey: "AIzaSyAsj0eyzBbypGOR5De6zaKDPeHuBRN0OD8",
  authDomain: "classics-quiz.firebaseapp.com",
  databaseURL: "https://classics-quiz.firebaseio.com",
  projectId: "classics-quiz",
  storageBucket: "",
  messagingSenderId: "236630132150"
};


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    QuizComponent,
    HomeComponent,
    AnswerFilterPipe,
    CapitalisePipe,
    LoginComponent,
    PrintComponent,
    AdminComponent,
    AddQuestionFormComponent,
    EditQuestionFormComponent,
    GapFillComponent,
    AddGapFillComponent,
    IlliadComponent,
    GapFillDisplayComponent,
    GapFillContainerComponent,
    SubjectsComponent,
    SubjectComponent,
    PageNotFoundComponent,
    EditGapFillComponent,
    MyResultsComponent

  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [
    AuthService,
    QuizDataService,
    QuizDatabaseService,
    GapFillService,
    SubjectsService,
    AuthGuard,
    AdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
