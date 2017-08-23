import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { QuizComponent } from './components/quizzes/quiz/quiz.component';
import { LoginComponent } from './components/login/login.component';
import { PrintComponent } from './components/print/print.component';
import { AdminComponent } from './components/admin/admin.component';

import { AnswerFilterPipe } from './pipes/answer-filter.pipe';

import { QuizDataService } from './services/quiz-data.service';
import { QuizDatabaseService } from './services/quiz-database.service';

import { AngularFireModule } from 'angularfire2';

// New imports to update based on AngularFire2 version 4
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';


export const firebaseConfig = {
  apiKey: "AIzaSyAsj0eyzBbypGOR5De6zaKDPeHuBRN0OD8",
  authDomain: "classics-quiz.firebaseapp.com",
  databaseURL: "https://classics-quiz.firebaseio.com",
  projectId: "classics-quiz",
  storageBucket: "",
  messagingSenderId: "236630132150"
};

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'quiz/:quiz', component: QuizComponent},
  {path: 'quiz/:quiz/print', component: PrintComponent},
  {path: 'login', component: LoginComponent},
  {path: 'admin', component: AdminComponent}
];



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    QuizComponent,
    HomeComponent,
    AnswerFilterPipe,
    LoginComponent,
    PrintComponent,
    AdminComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [
    QuizDataService,
    QuizDatabaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
