import { RouterModule, Routes } from '@angular/router';
// import { TardinessComponent } from 'src/app/performance/behavioral/tardiness.component';
import { PerformanceComponent } from 'src/app/performance/performance.component';
import { ReportsComponent } from './reports/reports.component';
import { AddReportComponent } from './reports/add-report/add-report.component';



const routes: Routes = [
  {
    path: "",
    component: PerformanceComponent,
    children: [
      // {path: 'towers', component: TowersComponent, canActivate: [AuthGuardService]},
      // {path: 'studios', component: StudioComponent, canActivate: [AuthGuardService]},
      // {path: 'tardiness', component: TardinessComponent, canActivate: [AuthGuardService]},
      // {path: 'performance', component: PerformanceComponent, canActivate: [AuthGuardService]}
      // {path: 'employees', component: EmployeesComponent, canActivate: [AuthGuardService]},
      // {path: 'employees/create', component: EmployeeCreateComponent, canActivate: [AuthGuardService]},
      // {path: 'employees/edit/:id', component: EmployeeEditComponent, canActivate: [AuthGuardService]},
      // {path: "**", redirectTo: "admin-company-list"}
      // { path: 'tardiness', component: TardinessComponent },
      { path: 'performance', component: PerformanceComponent},
      { path: 'reports', component: ReportsComponent},
      { path: 'reports/add-report', component: AddReportComponent},
      { path: "**", redirectTo: "/performance" }
    ]
  }
];

export const PerformanceRoutingModule = RouterModule.forChild(routes);

