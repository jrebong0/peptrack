import { ProjectFilterPipe } from './teams/teams.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { TeamsComponent } from './teams/teams.component';
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

import { AddProjectComponent } from './projects/add-project/add-project.component';
import { EditProjectComponent } from './projects/edit-project/edit-project.component';
import { DeleteProjectComponent } from './projects/delete-project/delete-project.component';
import { AddEngagementComponent } from './engagement/add-engagement/add-engagement.component';
import { EditEngagementComponent } from './engagement/edit-engagement/edit-engagement.component';
import { DeleteEngagementComponent } from './engagement/delete-engagement/delete-engagement.component';

import { SecurityComponent } from './security/security.component';
import { SecurityGroupAddComponent } from './security/security-group-add/security-group-add.component';
import { SecurityGroupDeleteComponent } from './security/security-group-delete/security-group-delete.component';
import { SecurityGroupEditComponent } from './security/security-group-edit/security-group-edit.component';

import { AddTeamComponent } from './teams/add-team/add-team.component';
import { UpdateTeamComponent } from './teams/update-team/update-team.component';
import { RolesComponent } from './roles/roles.component';


@NgModule({
  declarations: [
    AdminComponent,
    ProjectsComponent,
    EngagementComponent,
    ProjectFilterPipe,
    TeamsComponent,
    EmployeesComponent,
    EmployeeCreateComponent,
    EmployeeEditComponent,
    AddTowerDialogComponent,
    UpdateTowerDialogComponent,
    AddProjectComponent,
    EditProjectComponent,
    DeleteProjectComponent,
    AddEngagementComponent,
    EditEngagementComponent,
    DeleteEngagementComponent,
    SecurityComponent,
    SecurityGroupAddComponent,
    SecurityGroupDeleteComponent,
    SecurityGroupEditComponent,
    AddTeamComponent,
    UpdateTeamComponent,
    RolesComponent
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
    UpdateTowerDialogComponent,
    SecurityGroupAddComponent,
    SecurityGroupDeleteComponent,
    AddTeamComponent,
    UpdateTeamComponent
],
})
export class AdminModule { }

