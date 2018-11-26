import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-angular';
import { ReferenceService } from 'src/app/services/reference.service';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { ExcelEditorComponent } from './common/excel-editor/excel-editor.component';
import { ExcelUploadComponent } from './common/excel-upload/excel-upload.component';
import { FooterComponent } from './common/footer/footer.component';
import { HeaderComponent } from './common/header/header.component';
import { ModalComponent } from './common/modal/modal.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { TardinessComponent } from './performance/behavioral/tardiness.component';
import { PerformanceComponent } from './performance/performance.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ModalComponent,
    TardinessComponent,
    PerformanceComponent,
    ExcelUploadComponent,
    ExcelEditorComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    AgGridModule.withComponents([]),
    AppRoutingModule
  ],
  providers: [ ReferenceService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
