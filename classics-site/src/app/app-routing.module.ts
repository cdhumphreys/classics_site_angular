import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';

import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

import { SubjectsComponent } from './components/subjects/subjects.component';
import { SubjectComponent } from './components/subject/subject.component';
import { IlliadComponent } from './components/illiad/illiad.component';
import { GapFillContainerComponent } from './components/gap-fill-container/gap-fill-container.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { PrintComponent } from './components/print/print.component';

import { AddQuestionFormComponent } from './components/add-question-form/add-question-form.component';
import { EditQuestionFormComponent } from './components/edit-question-form/edit-question-form.component';
import { AddGapFillComponent } from './components/add-gap-fill/add-gap-fill.component';
import { EditGapFillComponent } from './components/edit-gap-fill/edit-gap-fill.component';
import { MyResultsComponent } from './components/my-results/my-results.component';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent, children:
    [
      {path: '', redirectTo: 'subjects', pathMatch: 'full'},
      {path: 'login', component: LoginComponent},
      {path: 'admin', component: AdminComponent, canActivate: [AdminGuard], children: [
        {path: 'add-gap-fill', component: AddGapFillComponent},
        {path: 'edit-gap-fill', component: EditGapFillComponent},
        {path: 'add-quiz-question', component: AddQuestionFormComponent},
        {path: 'edit-quiz-question', component: EditQuestionFormComponent}
      ]},
      {path: 'subjects', component: SubjectsComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard], children: [
        {path: ':subject/gap-fills', component: SubjectComponent},
        {path: ':subject/gap-fills/gapFill', component: GapFillContainerComponent}
      ]},
      {path: 'my-results', component: MyResultsComponent, canActivate: [AuthGuard]},
      {path: 'quiz/:book', component: QuizComponent},
      {path: 'quiz/:book/print', component: PrintComponent},

    ]
  },
  {path: '**', component: PageNotFoundComponent}

];


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {


}
