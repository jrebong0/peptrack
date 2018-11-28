import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {

  constructor(private db: AngularFirestore) { }

  getPerformanceList() {
    return this.db.collection('performances').snapshotChanges().pipe(
        map(items=>{
            return items.map(
                (item:any) => {
                    let id = item.payload.doc.id;
                    let data = item.payload.doc.data();
                    return {id, ...data};
                }
            );
        })
    );
  }
}
