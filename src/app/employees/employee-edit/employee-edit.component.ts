import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { EmployeeService } from 'src/app/services/employee.service';
import { RolesService } from 'src/app/services/roles.service';
import { SecurityGroupService } from 'src/app/services/security-group.service';
import { Employee } from 'src/app/models/employee.model';
import { combineLatest } from 'rxjs';
import { Role } from 'src/app/models/role.model';
import { SecurityGroup } from 'src/app/models/security.group.model';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  @ViewChild('f') employeeForm: NgForm;
  roles: Role[] = [];
  securityGroups: SecurityGroup[] = [];
  employee: Employee;
  employeeId: string;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private rolesService: RolesService,
    private securityGroupService: SecurityGroupService
  ) {
    this.employee = new Employee();
  }

  ngOnInit() {

    combineLatest(
      this.employeeService.getEmployee(this.route.snapshot.params['id']),
      this.rolesService.getRoles(),
      this.securityGroupService.getSecurityGroups()
    ).pipe(
      map(([employee, roles, securityGroups]) => {
        return { employee, roles, securityGroups };
      })
    ).subscribe((observer) => {
      this.roles = observer.roles;
      this.securityGroups = observer.securityGroups;
      this.employee = observer.employee;
    });
  }

  submit(data) {
    data.value.id = this.employee.id;
    this.employeeService.editEmployee(data.value);
  }
}
