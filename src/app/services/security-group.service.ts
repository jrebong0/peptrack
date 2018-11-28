import { Injectable } from '@angular/core';
import { SecurityGroup } from '../models/security.group.model';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SecurityGroupService {
  itemCount: number = 1;
  securityGroupCollection: AngularFirestoreCollection<SecurityGroup>;

  constructor(private db: AngularFirestore) {
    this.securityGroupCollection = db.collection<SecurityGroup>(
      'securityGroups',
      ref => {
        return ref
          .where('deleted', '==', false)
          .orderBy('sortOrder', 'asc')
          .orderBy('name', 'asc');
      }
    );
  }

  getSecurityGroups() {
    return this.securityGroupCollection.snapshotChanges().pipe(
      map(items => {
        this.itemCount = items.length;
        return items.map( item => {
          const id = item.payload.doc.id;
          const data = item.payload.doc.data();
          return {id, ...data};
        });
      })
    );
  }

  addSecurityGroup(data) {
    data.dateCreated = data.dateModified = new Date();
    data.permissions = '';
    data.sortOrder = this.itemCount + 1;
    data.deleted = false;
    this.securityGroupCollection.add(data);
  }

  editSecurityGroup(data) {
    data.dateModified = new Date();
    return this.db.doc('/securityGroups/' + data.id).update(data);
  }

  deleteSecurityGroup(data) {
    return this.db.doc('/securityGroups/' + data.id).update({
      deleted: true
    });
  }

  getById(id: string) {
    return this.db.doc('/securityGroups/' + id).snapshotChanges().pipe(
      map(item => {
        const id = item.payload.id;
        const data: any = item.payload.data();
        return {id, ...data};
      })
    );
  }
}
