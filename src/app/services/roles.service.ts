import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private db: AngularFirestore) { }

  getRoles() {
    return this.db.collection('roles').valueChanges();
  }
}
