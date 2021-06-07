import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentsFormComponent } from './students-form/students-form.component';
import { StudentsTableComponent } from './students-table/students-table.component';

const routes: Routes = [
  { path: '', component: StudentsTableComponent },
  { path: 'form', component: StudentsFormComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class StudentsRoutingModule {}
