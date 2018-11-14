import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'

import { AppComponent } from './app.component';
import { EmployeesComponent } from './employees/employees.component';
import { LoginComponent } from './login/login.component';


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
