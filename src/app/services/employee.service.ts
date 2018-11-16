import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Employee } from '../models/employee.model';
import { Observable } from 'rxjs';
import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employeesCollection: AngularFirestoreCollection<Employee>;
  private employees: Observable<Employee[]>;
  private rolesCollestion: AngularFirestoreCollection<Role>;
  private roles: Observable<Role[]>;

  constructor(private db: AngularFirestore) {
    this.employeesCollection = db.collection<Employee>('employees');
    this.employees = this.employeesCollection.valueChanges();

    this.rolesCollestion = db.collection<Role>('roles');
    this.roles = this.rolesCollestion.valueChanges();
  }

  getEmployees() {
    return this.employees;
  }

  addEmployee(data: Employee) {
    this.employeesCollection.add(data);
  }
}
