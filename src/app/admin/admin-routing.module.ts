import { RouterModule, Routes } from '@angular/router';
import { TeamsComponent } from './teams/teams.component';
import { AdminComponent } from './admin.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeCreateComponent } from './employees/employee-create/employee-create.component';
import { EmployeeEditComponent } from './employees/employee-edit/employee-edit.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { ProjectsComponent } from './projects/projects.component';
import { EngagementComponent } from './engagement/engagement.component';
import {RolesComponent} from './roles/roles.component';


const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    children: [
      // {path: 'towers', component: TowersComponent, canActivate: [AuthGuardService]},
      // {path: 'teams', component: TeamsComponent, canActivate: [AuthGuardService]},
      // {path: 'tardiness', component: TardinessComponent, canActivate: [AuthGuardService]},
      // {path: 'performance', component: PerformanceComponent, canActivate: [AuthGuardService]}
      // {path: 'employees', component: EmployeesComponent, canActivate: [AuthGuardService]},
      // {path: 'employees/create', component: EmployeeCreateComponent, canActivate: [AuthGuardService]},
      // {path: 'employees/edit/:id', component: EmployeeEditComponent, canActivate: [AuthGuardService]},
      // {path: "**", redirectTo: "admin-company-list"}
      {path: 'permissions', component: PermissionsComponent},
      {path: 'permissions/:id', component: PermissionsComponent},
      {path: 'projects', component: ProjectsComponent},
      {path: 'engagements', component: EngagementComponent},
      {path: 'teams', component: TeamsComponent},
      {path: 'employees', component: EmployeesComponent},
      {path: 'employees/create', component: EmployeeCreateComponent},
      {path: 'employees/edit/:id', component: EmployeeEditComponent},
      {path: 'roles', component: RolesComponent},
      {path: "**", redirectTo: "employees"}
    ]
  }
];

export const AdminRoutingModule = RouterModule.forChild(routes);

