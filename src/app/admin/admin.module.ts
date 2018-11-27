import { TowerFilterPipe } from './studio/studio.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { StudioComponent } from './studio/studio.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeCreateComponent } from './employees/employee-create/employee-create.component';
import { EmployeeEditComponent } from './employees/employee-edit/employee-edit.component';
import { EmployeeService } from '../services/employee.service';
import { ReferenceService } from '../services/reference.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-angular';
import { AddTowerDialogComponent } from './towers/add-tower-dialog/add-tower-dialog.component';
import { UpdateTowerDialogComponent } from './towers/update-tower-dialog/update-tower-dialog.component';
import { ProjectsComponent } from './projects/projects.component';
import { EngagementComponent } from './engagement/engagement.component';
import { SecurityComponent } from './security/security.component';
import { SecurityGroupAddComponent } from './security/security-group-add/security-group-add.component';
import { SecurityGroupDeleteComponent } from './security/security-group-delete/security-group-delete.component';
import { SecurityGroupEditComponent } from './security/security-group-edit/security-group-edit.component';

@NgModule({
  declarations: [
    AdminComponent,
    ProjectsComponent,
    EngagementComponent,
    TowerFilterPipe,
    StudioComponent,
    EmployeesComponent,
    EmployeeCreateComponent,
    EmployeeEditComponent,
    AddTowerDialogComponent,
    UpdateTowerDialogComponent,
    SecurityComponent,
    SecurityGroupAddComponent,
    SecurityGroupDeleteComponent,
    SecurityGroupEditComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    NgbModule,
    NgbModule.forRoot(),
    AgGridModule.withComponents([]),
  ],
  providers: [ EmployeeService, ReferenceService ],
  entryComponents: [
    AddTowerDialogComponent,
    UpdateTowerDialogComponent,
    SecurityGroupAddComponent,
    SecurityGroupDeleteComponent
],
})
export class AdminModule { }

