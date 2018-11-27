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
import { PermissionsComponent } from './permissions/permissions.component';
import { AddTowerDialogComponent } from './towers/add-tower-dialog/add-tower-dialog.component';
import { UpdateTowerDialogComponent } from './towers/update-tower-dialog/update-tower-dialog.component';
import { ProjectsComponent } from './projects/projects.component';
import { EngagementComponent } from './engagement/engagement.component';
import { AddProjectComponent } from './projects/add-project/add-project.component';
import { EditProjectComponent } from './projects/edit-project/edit-project.component';
import { DeleteProjectComponent } from './projects/delete-project/delete-project.component';
import { AddEngagementComponent } from './engagement/add-engagement/add-engagement.component';
import { EditEngagementComponent } from './engagement/edit-engagement/edit-engagement.component';
import { DeleteEngagementComponent } from './engagement/delete-engagement/delete-engagement.component';

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
    PermissionsComponent,
    AddTowerDialogComponent,
    UpdateTowerDialogComponent,
    AddProjectComponent,
    EditProjectComponent,
    DeleteProjectComponent,
    AddEngagementComponent,
    EditEngagementComponent,
    DeleteEngagementComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    NgbModule.forRoot(),
    AgGridModule.withComponents([]),
  ],
  providers: [ EmployeeService, ReferenceService ],
  entryComponents: [
    AddTowerDialogComponent,
    UpdateTowerDialogComponent
],
})
export class AdminModule { }

