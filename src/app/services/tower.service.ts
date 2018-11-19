import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TowerService {

  constructor(private db: AngularFirestore) { }

  getTowerList() {
    return this.db.collection('tower').stateChanges().pipe(
        map(items=>{
            return items.map(
                item => {
                    const key = item.payload.doc.ref.path;
                    const data = item.payload.doc.data();
                    return {key, ...data};
                }
            );
        })
    );
  }
}
