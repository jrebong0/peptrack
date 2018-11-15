import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class StudioService {

  constructor(private db: AngularFirestore) { }

  getStudioList() {
    //   console.log(this.db.collection('studio'));
      return this.db.collection('studio').valueChanges();
  }

  editStudio() {

  }

  addStudio() {
      
  }
}
