import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { LoginComponent } from './components/login/login.component';
import { PrintComponent } from './components/print/print.component';
import { AdminComponent } from './components/admin/admin.component';
import { AddQuestionFormComponent } from './components/add-question-form/add-question-form.component';
import { EditQuestionFormComponent } from './components/edit-question-form/edit-question-form.component';
import { GapFillComponent } from './components/gap-fill/gap-fill.component';
import { AddGapFillComponent } from './components/add-gap-fill/add-gap-fill.component';
import { IlliadComponent } from './components/illiad/illiad.component';
import { GermanicusComponent } from './components/germanicus/germanicus.component';
import { DayAtRacesComponent } from './components/day-at-races/day-at-races.component';
import { CategorySidebarComponent } from './components/category-sidebar/category-sidebar.component';
import { GapFillDisplayComponent } from './components/gap-fill-display/gap-fill-display.component';
import { GapFillContainerComponent } from './components/gap-fill-container/gap-fill-container.component';

import { AnswerFilterPipe } from './pipes/answer-filter.pipe';


import { AuthService } from './services/auth.service';
import { QuizDataService } from './services/quiz-data.service';
import { QuizDatabaseService } from './services/quiz-database.service';
import { GapFillService } from './services/gap-fill.service';

import { AuthGuard } from './guards/auth.guard';

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
  {path: 'illiad', component: IlliadComponent},
  {path: 'germanicus', component: GermanicusComponent},
  {path: 'dayAtRaces', component: DayAtRacesComponent},
  {path: 'quiz/:book', component: QuizComponent},
  {path: 'quiz/:book/print', component: PrintComponent},
  {path: 'login', component: LoginComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
  {path: 'gapFill', component: GapFillContainerComponent}
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
    AdminComponent,
    AddQuestionFormComponent,
    EditQuestionFormComponent,
    GapFillComponent,
    AddGapFillComponent,
    IlliadComponent,
    GermanicusComponent,
    DayAtRacesComponent,
    CategorySidebarComponent,
    GapFillDisplayComponent,
    GapFillContainerComponent

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
    AuthService,
    QuizDataService,
    QuizDatabaseService,
    GapFillService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
