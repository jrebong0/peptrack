import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { Routes, RouterModule } from '@angular/router'

import { AuthGuardService } from 'src/app/services/auth-guard.service';

import { AppComponent } from './app.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeCreateComponent } from './employees/employee-create/employee-create.component';
import { EmployeeEditComponent } from './employees/employee-edit/employee-edit.component';
import { LoginComponent } from './login/login.component';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { StudioComponent } from './studio/studio.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { environment } from '../environments/environment';
import { TowersComponent } from './towers/towers.component';

import { EmployeeService } from './services/employee.service';
import { ReferenceService } from 'src/app/services/reference.service';
import { ModalComponent } from './components/modal/modal.component';
import {TowerFilterPipe} from './studio/studio.pipe';
import { ExcelUploadComponent } from './excel-upload/excel-upload.component';
import { ExcelEditorComponent } from './excel-editor/excel-editor.component';
import { AgGridModule } from 'ag-grid-angular';
import { TardinessComponent } from './tardiness/tardiness.component';



const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'employees', component: EmployeesComponent, canActivate: [AuthGuardService] },
  { path: 'employees/create', component: EmployeeCreateComponent, canActivate: [AuthGuardService] },
  { path: 'employees/edit/:id', component: EmployeeEditComponent, canActivate: [AuthGuardService] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService]},
  { path: 'towers', component: TowersComponent, canActivate: [AuthGuardService] },
  { path: 'studios', component: StudioComponent, canActivate: [AuthGuardService] },
  { path: 'tardiness', component: TardinessComponent, canActivate: [AuthGuardService] },
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
    TowersComponent,
    TowerFilterPipe,
    ModalComponent,
    EmployeeEditComponent,
    ExcelUploadComponent,
    ExcelEditorComponent,
    TardinessComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AgGridModule.withComponents([])
  ],
  providers: [ EmployeeService, ReferenceService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
