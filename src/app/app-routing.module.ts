import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {TardinessComponent} from './performance/behavioral/tardiness.component';
import {PerformanceComponent} from './performance/performance.component';
import {AuthGuardService} from './services/auth-guard.service';

const appRoutes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
    {path: 'tardiness', component: TardinessComponent},
    {path: 'home', component: HomeComponent},
    {path: 'performance', component: PerformanceComponent, canActivate: [AuthGuardService]}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
