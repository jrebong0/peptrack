import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee.model';
import { RolesService } from 'src/app/services/roles.service';
import { Role } from 'src/app/models/role.model';
import { SecurityGroupService } from 'src/app/services/security-group.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Component({
  selector: 'employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {
  @ViewChild('f') employeeForm: NgForm;
  studios: {}[];
  securityGroups: {}[];
  roles: Role[];

  submitted = false;

  employee: Employee;

  constructor(
    private employeeService: EmployeeService,
    private rolesService: RolesService,
    private securityGroupService: SecurityGroupService,
    private db: AngularFirestore
  ) { }

  ngOnInit() {
    // retrieve roles
    this.rolesService.getRoles().subscribe(
      items => {
        this.roles = items;
        console.log('role', this.roles);
      }
    );

    // retrieve securityGroups
    this.securityGroupService.getSecurityGroups().subscribe(
      items => {
        this.securityGroups = items;
        console.log('secirutygroups', this.securityGroups);
      }
    );

    // retrieve studios
    // @todo: temporary until StudiosSevice is refactored
    this.db.collection<any>('studio').snapshotChanges().pipe(
      map(items => {
        return items.map( item => {
          const id = item.payload.doc.id;
          const data = item.payload.doc.data();
          return {id, ...data};
        });
      })
    ).subscribe(
      (list: any[]) => {
        this.studios = list;
        console.log('studios', this.studios);
      },
      (error) => console.log('studio service error', error)
    );
  }

  submit(data) {
    this.employeeService.addEmployee(data.value);
    this.employeeForm.reset();
  }
}
