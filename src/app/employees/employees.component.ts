import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Observable } from 'rxjs';
import { RolesService } from '../services/roles.service';
import { Role } from '../models/role.model';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: Observable<any[]>;
  towers: {}[];
  studios: {}[];
  roles: Observable<any[]>;

  constructor(
    private employeeService: EmployeeService,
    private rolesService: RolesService
  ) { }

  ngOnInit() {
    this.employees = this.employeeService.getEmployees();
    this.roles = this.rolesService.getRoles();
    this.towers = [
      { key: 't1', name: 'Tower 1'},
      { key: 't2', name: 'Tower 2'}
    ];
    this.studios = [
      { key: 's1', name: 'Studio 1', tower: 't1'},
      { key: 's2', name: 'Studio 2', tower: 't1'},
      { key: 's3', name: 'Studio 3', tower: 't2'},
      { key: 's4', name: 'Studio 4', tower: 't2'},
      { key: 's5', name: 'Studio 5', tower: 't2'}
    ];
  }

}
