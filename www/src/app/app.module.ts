import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormComponent } from './form/form.component'
import { TableComponent } from './table/table.component'
import { MatTableModule } from '@angular/material/table'

@NgModule({

  declarations: [
    AppComponent,
    FormComponent,
    TableComponent
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatTableModule
  ],

  providers: [],

  bootstrap: [ AppComponent ]
})

export class AppModule {}
