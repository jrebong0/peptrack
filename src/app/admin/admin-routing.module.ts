import { RouterModule, Routes } from '@angular/router';
import { StudioComponent } from './studio/studio.component';
import { AdminComponent } from './admin.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeCreateComponent } from './employees/employee-create/employee-create.component';
import { EmployeeEditComponent } from './employees/employee-edit/employee-edit.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { ProjectsComponent } from './projects/projects.component';
import { EngagementComponent } from './engagement/engagement.component';
import { AddProjectComponent } from './projects/add-project/add-project.component';
import { EditProjectComponent } from './projects/edit-project/edit-project.component';
import { DeleteProjectComponent } from './projects/delete-project/delete-project.component';
import { AddEngagementComponent } from './engagement/add-engagement/add-engagement.component';
import { EditEngagementComponent } from './engagement/edit-engagement/edit-engagement.component';
import { DeleteEngagementComponent } from './engagement/delete-engagement/delete-engagement.component';

const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    children: [
      // {path: 'towers', component: TowersComponent, canActivate: [AuthGuardService]},
      // {path: 'studios', component: StudioComponent, canActivate: [AuthGuardService]},
      // {path: 'tardiness', component: TardinessComponent, canActivate: [AuthGuardService]},
      // {path: 'performance', component: PerformanceComponent, canActivate: [AuthGuardService]}
      // {path: 'employees', component: EmployeesComponent, canActivate: [AuthGuardService]},
      // {path: 'employees/create', component: EmployeeCreateComponent, canActivate: [AuthGuardService]},
      // {path: 'employees/edit/:id', component: EmployeeEditComponent, canActivate: [AuthGuardService]},
      // {path: "**", redirectTo: "admin-company-list"}
      {path: 'permissions', component: PermissionsComponent},
      {path: 'permissions/:id', component: PermissionsComponent},
      {path: 'projects', component: ProjectsComponent},
      {path: 'projects/add-project', component: AddProjectComponent},
      {path: 'projects/edit-project', component: EditProjectComponent},
      {path: 'projects/delete-project', component: DeleteProjectComponent},
      {path: 'engagements', component: EngagementComponent},
      {path: 'engagements/add-engagement', component: AddEngagementComponent},
      {path: 'engagements/edit-engagement', component: EditEngagementComponent},
      {path: 'engagements/delete-engagement', component: DeleteEngagementComponent},
      {path: 'studios', component: StudioComponent},
      {path: 'employees', component: EmployeesComponent},
      {path: 'employees/create', component: EmployeeCreateComponent},
      {path: 'employees/edit/:id', component: EmployeeEditComponent},
      {path: "**", redirectTo: "employees"}
    ]
  }
];

export const AdminRoutingModule = RouterModule.forChild(routes);

