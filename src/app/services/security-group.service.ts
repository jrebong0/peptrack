import { Injectable } from '@angular/core';
import { SecurityGroup } from '../models/security.group.model';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SecurityGroupService {
  private securityGroupCollection: AngularFirestoreCollection<SecurityGroup>;

  constructor(private db: AngularFirestore) {
    this.securityGroupCollection = db.collection<SecurityGroup>('securityGroups');
  }

  getSecurityGroups() {
    return this.securityGroupCollection.snapshotChanges().pipe(
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
