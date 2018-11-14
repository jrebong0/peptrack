import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private db: AngularFirestore) { }

  getEmployees() {
    return this.db.collection('employees').valueChanges();
  }
}
