import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TowerService {

  constructor(private db: AngularFirestore) { }

  getTowerList() {
    //   console.log(this.db.collection('tower'));
      return this.db.collection('tower').valueChanges();
  }
}
