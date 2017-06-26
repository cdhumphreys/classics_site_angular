import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { QuizComponent } from './components/quizzes/quiz/quiz.component';
import { HomeComponent } from './components/home/home.component';
import { AnswerFilterPipe } from './pipes/answer-filter.pipe';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'quiz/:quiz', component: QuizComponent}
];



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    QuizComponent,
    HomeComponent,
    AnswerFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
