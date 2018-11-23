import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { Routes, RouterModule } from '@angular/router'
// import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { AppComponent } from './app.component';
// import { EmployeesComponent } from './employees/employees.component';
// import { EmployeeCreateComponent } from './employees/employee-create/employee-create.component';
// import { EmployeeEditComponent } from './employees/employee-edit/employee-edit.component';
// import { StudioComponent } from './studio/studio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-angular';
import { ReferenceService } from 'src/app/services/reference.service';
import { environment } from '../environments/environment';
import { ExcelEditorComponent } from './excel-editor/excel-editor.component';
import { ExcelUploadComponent } from './excel-upload/excel-upload.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ModalComponent } from './components/modal/modal.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
// import { AppRoutingModule } from './app-routing.module';
// import { TardinessComponent } from './performance/behavioral/tardiness.component';
import { PerformanceComponent } from './performance/performance.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ModalComponent,
    // TardinessComponent,
    PerformanceComponent,
    ExcelUploadComponent,
    ExcelEditorComponent
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
    AgGridModule.withComponents([])
  ],
  providers: [ ReferenceService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
