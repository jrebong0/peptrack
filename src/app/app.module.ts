import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { Routes, RouterModule } from '@angular/router'

import { AppComponent } from './app.component';
import { EmployeesComponent } from './employees/employees.component';
import { LoginComponent } from './login/login.component';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { EmployeeCreateComponent } from './employees/employee-create/employee-create.component';
import { StudioComponent } from './studio/studio.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



import { environment } from '../environments/environment';
import { TowersComponent } from './towers/towers.component';
import { EmployeeService } from './services/employee.service';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'employees', component: EmployeesComponent, canActivate: [AuthGuardService] },
  { path: 'employees/create', component: EmployeeCreateComponent, canActivate: [AuthGuardService] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService]},
  { path: 'towers', component: TowersComponent, canActivate: [AuthGuardService] },
  { path: 'studios', component: StudioComponent, canActivate: [AuthGuardService] }

];

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    LoginComponent,
    HeaderComponent,
    EmployeeCreateComponent,
    StudioComponent,
    FooterComponent,
    HomeComponent,
    TowersComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ EmployeeService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
