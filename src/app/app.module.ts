import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AgGridModule } from 'ag-grid-angular';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { ReferenceService } from 'src/app/services/reference.service';
import { environment } from '../environments/environment';
import { EmployeeCreateComponent } from './admin/employees/employee-create/employee-create.component';
import { EmployeeEditComponent } from './admin/employees/employee-edit/employee-edit.component';
import { EmployeesComponent } from './admin/employees/employees.component';
import { StudioComponent } from './admin/studio/studio.component';
import { TowerFilterPipe } from './admin/studio/studio.pipe';
import { TowersComponent } from './admin/towers/towers.component';
import { AppComponent } from './app.component';
import { ExcelEditorComponent } from './common/excel-editor/excel-editor.component';
import { ExcelUploadComponent } from './common/excel-upload/excel-upload.component';
import { FooterComponent } from './common/footer/footer.component';
import { HeaderComponent } from './common/header/header.component';
import { ModalComponent } from './common/modal/modal.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TardinessComponent } from './performance/behavioral/tardiness.component';
import { PerformanceComponent } from './performance/performance.component';
import { EmployeeService } from './services/employee.service';
import { AppRoutingModule } from './app-routing.module';



// const appRoutes: Routes = [
//   { path: '', redirectTo: 'home', pathMatch: 'full' },
//   { path: 'login', component: LoginComponent },
//   { path: 'employees', component: EmployeesComponent, canActivate: [AuthGuardService] },
//   { path: 'employees/create', component: EmployeeCreateComponent, canActivate: [AuthGuardService] },
//   { path: 'employees/edit/:id', component: EmployeeEditComponent, canActivate: [AuthGuardService] },
//   { path: 'home', component: HomeComponent, canActivate: [AuthGuardService]},
//   { path: 'towers', component: TowersComponent, canActivate: [AuthGuardService] },
//   { path: 'studios', component: StudioComponent, canActivate: [AuthGuardService] },
//   { path: 'tardiness', component: TardinessComponent, canActivate: [AuthGuardService] },
//   { path: 'performance', component: PerformanceComponent, canActivate: [AuthGuardService] }
// ];

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
    TardinessComponent,
    PerformanceComponent
  ],
  imports: [
    BrowserModule,
    // RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    AgGridModule.withComponents([]),
    AppRoutingModule
  ],
  providers: [ EmployeeService, ReferenceService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
