import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SprintsService {

    constructor(private db: AngularFirestore) { }

    getSprintsList() {
        return this.db.collection('sprints').snapshotChanges().pipe(
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
