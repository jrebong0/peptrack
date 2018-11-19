import { Injectable } from '@angular/core';
import { AngularFirestore, Reference } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudioService {

    constructor(private db: AngularFirestore) { }

    getStudioList() {
        return this.db.collection('studio').snapshotChanges().pipe(
            map(items=>{
                return items.map(
                    (item:any) => {
                        let key = item.payload.doc.id;
                        let data = item.payload.doc.data();
                        data.tower = data.tower.path;
                        return {key, ...data};
                    }
                );
            })
        );
    }

    updateStudioList(editItem: {name: string, tower: string}, key: string):void {
        let newTowerRef = this.getReferencePath(editItem.tower);
        let updatedData = {
            name: editItem.name,
            tower: newTowerRef
        };
        this.db.collection('studio').doc(key).update(updatedData);
    }

    addStudio(item: {name: string, tower: string}) {
        let newTowerRef = this.getReferencePath(item.tower);
        let newStudio = {
            name: item.name, 
            tower: newTowerRef, 
            type: 'admin'
        };
        this.db.collection('studio').add(newStudio);
    }

    getReferencePath(tower: string) {
        let path = tower.split('/');
        let towerPath = this.db.collection(path[0]).doc(path[1]).ref;
        return towerPath;
    }
}
