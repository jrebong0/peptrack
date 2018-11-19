import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Employee } from '../models/employee.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employeesCollection: AngularFirestoreCollection<Employee>;

  constructor(private db: AngularFirestore) {
    this.employeesCollection = db.collection<Employee>('employees');
  }

  /**
   * Return list of employees
   * @returns Observable object
   */
  getEmployees() {
    return this.employeesCollection.snapshotChanges().pipe(
      map(items => {
        return items.map( item => {
          const id = item.payload.doc.id;
          const data = item.payload.doc.data();
          return {id, ...data};
        });
      })
    );
  }

  /**
   * add Employee to Firebase
   * @todo Must set role, securityGroup, and studio as
   *  reference field and not a <string>
   * @param data Employee object
   */
  addEmployee(data) {
    const roleRef = this.db.doc('/roles/' + data.role);
    const securityGroupRef = this.db.doc('/securityGroups/' + data.securityGroup);
    const studioRef = this.db.doc('/studio/' + data.studio);
    
    // @see todo
    // delete data.role;
    // delete data.securityGroup;
    // delete data.studio;

    const employeeRef = this.employeesCollection.add(data);

    // @see todo
    // employeeRef.then(doc => {
    //   doc.set({
    //     role: roleRef,
    //     securityGroup: securityGroupRef,
    //     studio: studioRef
    //   });
    // });
  }
}
