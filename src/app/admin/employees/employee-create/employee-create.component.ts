import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee.model';
import { RolesService } from 'src/app/services/roles.service';
import { Role } from 'src/app/models/role.model';
import { SecurityGroupService } from 'src/app/services/security-group.service';
import { map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { SecurityGroup } from 'src/app/models/security.group.model';
import { Router } from '@angular/router';
import { TeamsService } from 'src/app/services/teams.service';
import { Team } from 'src/app/models/team.model';

@Component({
  selector: 'employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {
  @ViewChild('f') employeeForm: NgForm;
  securityGroups: SecurityGroup[];
  roles: Role[];
  teams: Team[];

  submitted = false;

  employee: Employee;

  constructor(
    private employeeService: EmployeeService,
    private rolesService: RolesService,
    private securityGroupService: SecurityGroupService,
    private teamsService: TeamsService,
    private router: Router
  ) { }

  ngOnInit() {
    combineLatest(
      this.rolesService.getRoles(),
      this.securityGroupService.getSecurityGroups(),
      this.teamsService.getTeamList()
    ).pipe(
      map(([roles, securityGroups, teams]) => {
        return { roles, securityGroups, teams };
      })
    ).subscribe((observer) => {
      this.roles = observer.roles;
      this.securityGroups = observer.securityGroups;
      this.teams = observer.teams;
    });
  }

  submit(data) {
    this.employeeService.addEmployee(data.value);
    this.employeeForm.reset();
    this.router.navigate(['employees']);
  }
}
