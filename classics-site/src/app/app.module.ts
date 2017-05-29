import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router'; 
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { QuizComponent } from './components/quizzes/quiz/quiz.component';
import { QuizQuestionsComponent } from './components/quizzes/quiz/quiz-questions/quiz-questions.component';
import { QuestionComponent } from './components/quizzes/quiz/quiz-questions/question/question.component';
import { HomeComponent } from './components/home/home.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'quiz/:quiz', component: QuizComponent}
];



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    QuizComponent,
    QuizQuestionsComponent,
    QuestionComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
