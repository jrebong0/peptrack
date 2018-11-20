import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ReferenceService } from '../services/reference.service';
import { map } from 'rxjs/operators';
import { Tower } from '../models/tower.model';

@Injectable({
    providedIn: 'root'
})
export class TowerService {

    constructor(private db: AngularFirestore,
        private refService: ReferenceService) { }

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

    updateTower(tower: Tower, key: string) {
        let newKey = key.split("/");
        tower.createdBy = this.refService.getReferencePath(
            'employee/'.concat(tower.createdBy)
        );
        this.db.collection('tower').doc(newKey[1]).update(tower);
    }

    addTower(tower: Tower) {
        this.db.collection('tower').add(tower);
    }
}
