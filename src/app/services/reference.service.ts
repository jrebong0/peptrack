import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ReferenceService {

  constructor(private db: AngularFirestore) { }

  getReferencePath(reference: string) {
    let path = reference.split('/');
    let refPath = this.db.collection(path[0]).doc(path[1]).ref;
    return refPath;
  }
}
