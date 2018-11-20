import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, switchMap } from 'rxjs/operators';
import { EmployeeService } from 'src/app/services/employee.service';
import { RolesService } from 'src/app/services/roles.service';
import { SecurityGroupService } from 'src/app/services/security-group.service';
import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  @ViewChild('f') employeeForm: NgForm;
  roles: {}[];
  securityGroups: {}[];
  studios: {}[];
  employee: Employee;
  employeeId: string;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private rolesService: RolesService,
    private securityGroupService: SecurityGroupService,
    private db: AngularFirestore
  ) { }

  ngOnInit() {
    // set employee id
    this.employeeService.getEmployee(this.route.snapshot.params['id']).subscribe(
      data => {
        this.employee = data;
        this.employee.role = data.role.id;
        this.employee.securityGroup = data.securityGroup.id;
        this.employee.studio = data.studio.id;
      }
    );

    // retrieve roles
    this.rolesService.getRoles().subscribe(
      items => {
        this.roles = items;
      }
    );

    // retrieve securityGroups
    this.securityGroupService.getSecurityGroups().subscribe(
      items => {
        this.securityGroups = items;
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
      },
      (error) => console.log('studio service error', error)
    );
  }

  submit(data) {
    data.value.id = this.employee.id;
    this.employeeService.editEmployee(data.value);
  }
}
