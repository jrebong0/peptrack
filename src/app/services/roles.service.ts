import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Role } from '../models/role.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private rolesCollection: AngularFirestoreCollection<Role>;

  constructor(private db: AngularFirestore) {
    this.rolesCollection = db.collection<Role>('roles');
  }

  getRoles() {
    // return this.db.collection('roles').valueChanges();
    return this.rolesCollection.snapshotChanges().pipe(
      map(items => {
        return items.map( item => {
          const id = item.payload.doc.id;
          const data = item.payload.doc.data();
          return {id, ...data};
        });
      })
    );
  }
}
