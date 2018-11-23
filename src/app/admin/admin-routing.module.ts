import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TowersComponent } from './towers/towers.component';
import { AuthGuardService } from '../services/auth-guard.service';
import { StudioComponent } from './studio/studio.component';
import { AdminComponent } from './admin.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeCreateComponent } from './employees/employee-create/employee-create.component';
import { EmployeeEditComponent } from './employees/employee-edit/employee-edit.component';
import { PermissionsComponent } from './permissions/permissions.component';


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
      {path: 'towers', component: TowersComponent},
      {path: 'studios', component: StudioComponent},
      {path: 'employees', component: EmployeesComponent},
      {path: 'employees/create', component: EmployeeCreateComponent},
      {path: 'employees/edit/:id', component: EmployeeEditComponent},
      {path: "**", redirectTo: "employees"}
    ]
  }
];

export const AdminRoutingModule = RouterModule.forChild(routes);

