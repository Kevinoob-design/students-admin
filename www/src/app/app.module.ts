import { NgModule } from '@angular/core'
import { AppRoutingModule } from './app-routing.module'
import { MatToolbarModule } from '@angular/material/toolbar'
import { AppComponent } from './app.component'
import { StudentsModule } from './students/students.module'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    MatToolbarModule,
    StudentsModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})

export class AppModule {}
