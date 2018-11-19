import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {Studio} from '../models/studio.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudioService {

  constructor(private db: AngularFirestore) { }

  getStudioList() {
    // return this.db.collection('studio').valueChanges();
    return this.db.collection('studio').snapshotChanges().pipe(
      map(items => {
        console.log('map[', items);
        return items.map(
          item => {
            const key = item.payload.doc.id;
            const data = item.payload.doc.data();
            return { key, data };
          }
        );
      })
    );
  }

  //   editStudio(value: Studio, index: number) {
  //     this.db.collection('studio').stateChanges();
  //   }
  updateStudioList(editItem: { name: string, tower: string }, key: string): void {
    // console.log(this.db.collection('studio').doc);
    console.log('updateStudioList', editItem, key);
    this.db.collection('studio').doc(key).update(editItem);
  }

  addStudio(item: { name: string, tower: string }) {
    const newItem = item;
    //newItem.type = 'admin';
    this.db.collection('studio').add(item);
  }
}
