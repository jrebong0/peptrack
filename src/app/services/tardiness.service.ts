import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import {log} from 'util';

@Injectable({
  providedIn: 'root'
})
export class TardinessService {

    constructor(private db: AngularFirestore) { }

    getTardinessList() {
        return this.db.collection('sprints').snapshotChanges().pipe(
            map(items=>{
                return items.map(
                    (item:any) => {
                        let key = item.payload.doc.id;
                        let data = item.payload.doc.data();
                        let tardiness = data.tardiness;
                        let employee = data.employee;
                        // let employeeName;
                        // console.log('employee', employee, employee.id);
                        // let getEmployeeInfo = this.db.collection('employees').doc(employee.id).get().subscribe(
                        //     (data:any) => {
                        //         console.log('employee data', data.data());
                        //         // let employeeCompleteData = data.data();
                        //         return {key, tardiness, data};
                        //     }
                        // );
                        // console.log('getEmployeeInfo', getEmployeeInfo);
                        
                        return {key, tardiness, employee};
                    }
                );
            })
        );
    }

    // updateStudioList(editItem: {name: string, tower: string}, key: string):void {
    //     let newTowerRef = this.getReferencePath(editItem.tower);
    //     let updatedData = {
    //         name: editItem.name,
    //         tower: newTowerRef
    //     };
    //     this.db.collection('studio').doc(key).update(updatedData);
    // }

    // addStudio(item: {name: string, tower: string}) {
    //     let newTowerRef = this.getReferencePath(item.tower);
    //     let newStudio = {
    //         name: item.name, 
    //         tower: newTowerRef, 
    //         type: 'admin'
    //     };
    //     this.db.collection('studio').add(newStudio);
    // }

    // getReferencePath(tower: string) {
    //     let path = tower.split('/');
    //     let towerPath = this.db.collection(path[0]).doc(path[1]).ref;
    //     return towerPath;
    // }
}
