import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-angular';
import { ReferenceService } from 'src/app/services/reference.service';
import { AppComponent } from 'src/app/app.component';
import { LoginComponent } from 'src/app/login/login.component';
import { HeaderComponent } from 'src/app/common/header/header.component';
import { FooterComponent } from 'src/app/common/footer/footer.component';
import { HomeComponent } from 'src/app/home/home.component';
import { ModalComponent } from 'src/app/common/modal/modal.component';
import { ExcelUploadComponent } from 'src/app/common/excel-upload/excel-upload.component';
import { ExcelEditorComponent } from 'src/app/common/excel-editor/excel-editor.component';
import { environment } from 'src/environments/environment';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    HomeComponent,
    ModalComponent,
    ExcelUploadComponent,
    ExcelEditorComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AgGridModule.withComponents([]),
    CommonModule,
  ],
  exports: [
    HomeComponent,
    ModalComponent,
    ExcelUploadComponent,
    ExcelEditorComponent
  ],
  providers: [ReferenceService],
})
export class CommonAppModule { }
