import { TowerFilterPipe } from './studio/studio.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { TowersComponent } from './towers/towers.component';
import { StudioComponent } from './studio/studio.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeCreateComponent } from './employees/employee-create/employee-create.component';
import { EmployeeEditComponent } from './employees/employee-edit/employee-edit.component';
import { EmployeeService } from '../services/employee.service';
import { ReferenceService } from '../services/reference.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [
    AdminComponent,
    TowersComponent,
    TowerFilterPipe,
    StudioComponent,
    EmployeesComponent,
    EmployeeCreateComponent,
    EmployeeEditComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbModule.forRoot(),
    AgGridModule.withComponents([]),
  ],
  providers: [ EmployeeService, ReferenceService ],
})
export class AdminModule { }

