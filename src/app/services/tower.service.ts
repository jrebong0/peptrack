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

    updateTower(name: string, key: string):void {
        let updatedData = {
            name: name
        };
        this.db.collection('tower').doc(key).update(updatedData);
    }

    addStudio(name: string) {
        let newTower = {
            name: name,
            type: 'admin',
            created: new Date()
        };
        this.db.collection('tower').add(newTower);
    }
}
