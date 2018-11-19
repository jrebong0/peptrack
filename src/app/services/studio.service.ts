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
                console.log('map[', items);
                return items.map(
                    (item:any) => {
                        let key = item.payload.doc.id;
                        let data = item.payload.doc.data();
                        if(data) {
                            console.log('data', data.tower.path);
                        }
                        data.tower = data.tower.path;
                        return {key, data};
                    }
                );
            })
        );
    }

    updateStudioList(editItem: {name: string, tower: string}, key: string):void {
        let path = editItem.tower.split('/');
        let towerPath = this.db.collection(path[0]).doc(path[1]).ref;
        let updatedData = {
            name: editItem.name,
            tower: towerPath
        };
        this.db.collection('studio').doc(key).update(updatedData);
    }

    addStudio(item: {name: string, tower: string}) {
        let newStudio = {name: item.name, tower: item.tower, type: 'admin'};
        this.db.collection('studio').add(newStudio);
    }
}
