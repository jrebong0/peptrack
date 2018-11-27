import { RouterModule, Routes } from '@angular/router';
import { StudioComponent } from './studio/studio.component';
import { AdminComponent } from './admin.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeCreateComponent } from './employees/employee-create/employee-create.component';
import { EmployeeEditComponent } from './employees/employee-edit/employee-edit.component';
import { ProjectsComponent } from './projects/projects.component';
import { EngagementComponent } from './engagement/engagement.component';
import { SecurityComponent } from './security/security.component';


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
      {path: 'security', component: SecurityComponent},
      {path: 'security/:id/permissions', component: SecurityComponent},
      {path: 'projects', component: ProjectsComponent},
      {path: 'engagements', component: EngagementComponent},
      {path: 'studios', component: StudioComponent},
      {path: 'employees', component: EmployeesComponent},
      {path: 'employees/create', component: EmployeeCreateComponent},
      {path: 'employees/edit/:id', component: EmployeeEditComponent},
      {path: "**", redirectTo: "employees"}
    ]
  }
];

export const AdminRoutingModule = RouterModule.forChild(routes);

