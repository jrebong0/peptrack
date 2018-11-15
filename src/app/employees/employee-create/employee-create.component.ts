import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {
  @ViewChild('f') employeeForm: NgForm;
  studios: {}[];
  securityGroups: {}[];

  submitted = false;

  employee: Employee;

  constructor(
    private employeeService: EmployeeService
  ) {
    this.studios = [
      { key: 's1', name: 'Studio 1', tower: 't1'},
      { key: 's2', name: 'Studio 2', tower: 't1'},
      { key: 's3', name: 'Studio 3', tower: 't2'},
      { key: 's4', name: 'Studio 4', tower: 't2'},
      { key: 's5', name: 'Studio 5', tower: 't2'}
    ];
    this.securityGroups = [
      { key: 'None', name: 'None' },
      { key: 'Super Admin', name: 'Super Admin' },
      { key: 'Admin', name: 'Admin' },
      { key: 'Moderator', name: 'Moderator' }
    ];
  }

  ngOnInit() {
  }

  submit(data) {
    this.employeeService.addEmployee(data.value);
    this.employeeForm.reset();
  }
}
