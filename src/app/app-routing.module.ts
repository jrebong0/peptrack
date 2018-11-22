import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmployeeCreateComponent} from './admin/employees/employee-create/employee-create.component';
import {EmployeeEditComponent} from './admin/employees/employee-edit/employee-edit.component';
import {EmployeesComponent} from './admin/employees/employees.component';
import {StudioComponent} from './admin/studio/studio.component';
import {TowersComponent} from './admin/towers/towers.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {TardinessComponent} from './performance/behavioral/tardiness.component';
import {PerformanceComponent} from './performance/performance.component';
import {AuthGuardService} from './services/auth-guard.service';

const appRoutes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'employees', component: EmployeesComponent, canActivate: [AuthGuardService]},
    {path: 'employees/create', component: EmployeeCreateComponent, canActivate: [AuthGuardService]},
    {path: 'employees/edit/:id', component: EmployeeEditComponent, canActivate: [AuthGuardService]},
    {path: 'home', component: HomeComponent, canActivate: [AuthGuardService]},
    {path: 'towers', component: TowersComponent, canActivate: [AuthGuardService]},
    {path: 'studios', component: StudioComponent, canActivate: [AuthGuardService]},
    {path: 'tardiness', component: TardinessComponent, canActivate: [AuthGuardService]},
    {path: 'performance', component: PerformanceComponent, canActivate: [AuthGuardService]}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
