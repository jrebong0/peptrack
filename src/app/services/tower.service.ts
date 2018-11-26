import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ReferenceService } from '../services/reference.service';
import { map } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { Tower } from '../models/sprint.model';

@Injectable({
    providedIn: 'root'
})
export class TowerService {
    tower: Tower;

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

    updateTower(form: NgForm) {
        this.tower = {
            name: form.value.updateName,
            dateCreated: Date(),
            createdBy: this.refService.getReferencePath(
                'employee/'.concat(localStorage.getItem('currentUser'))),
            type: 'admin'
        };
        let newKey = form.value.key.split("/");
        this.db.collection('tower').doc(newKey[1]).update(this.tower);
    }

    addTower(form: NgForm) {
        this.tower = {
            name: form.value.towerName,
            dateCreated: Date(),
            createdBy: this.refService.getReferencePath(
                'employee/'.concat(localStorage.getItem('currentUser'))),
            type: 'admin'
          };
        return this.db.collection('tower').add(this.tower);
    }
}
