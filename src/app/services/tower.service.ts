import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TowerService {

  constructor(private db: AngularFirestore) { }

  getTowerList() {
    //   console.log(this.db.collection('tower'));
    //   return this.db.collection('tower').valueChanges();
    return this.db.collection('tower').stateChanges().pipe(
        map(items=>{
            console.log('map[', items);
            return items.map(
                item => {
                    console.log('tower ref', item.payload.doc.ref.path);
                    const key = item.payload.doc.ref.path;
                    const data = item.payload.doc.data();
                    return {key, data};
                }
            );
        })
    );
  }
}
