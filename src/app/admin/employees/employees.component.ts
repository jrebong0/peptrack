import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Role } from 'src/app/models/role.model';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { RolesService } from 'src/app/services/roles.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  @ViewChild('filtersForm') filtersForm: NgForm;
  employees: any[];
  towers: {}[];
  studios: any[];
  roles: Role[];
  selectedEmployee: Employee;
  showFilters = false;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private employeeService: EmployeeService,
    private rolesService: RolesService,
    private db: AngularFirestore // used for getting studios (temp until StudioService is refactored)
  ) { }

  ngOnInit() {
    // @todo combine observables

    // retrieve roles
    this.rolesService.getRoles().subscribe(
      item => {
        this.roles = item;
        console.log('role', this.roles);
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

    // retrieve towers
    // @todo: retrieve from service
    this.towers = [
      { id: 't1', name: 'Tower 1'},
      { id: 't2', name: 'Tower 2'}
    ];

    // retrieve employees
    this.employeeService.getEmployees().subscribe(
      (list: any[]) => {
        this.employees = list;
        // console.log('employees', this.employees);
      },
      (error) => console.log('employee service error', error)
    );
  }

  getRole(id: string) {
    return this.roles.find(x => x.id == id).name;
  }

  getStudio(id: string) {
    return this.studios.find(x => x.id == id).name;
  }

  editEmployee(data: Employee) {
    this.router.navigate(['employees/edit', data.id]);
  }

  deleteEmployee() {
    this.employeeService.deleteEmployee(this.selectedEmployee);
    this.modalService.dismissAll();
  }

  openDeleteModal(content, item) {
    this.selectedEmployee = item;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  toggleShowFilters() {
    this.showFilters = !this.showFilters;
  }

  filterBySearchKey(data) {
    // data.value.searchKey
    this.employeeService.getEmployees({
      searchKey: data.value.searchKey,
      role: data.value.roleFilter
    }).subscribe(
      (list: any[]) => {
        this.employees = list;
      },
      (error) => console.log('employee service error', error)
    );
  }
}
