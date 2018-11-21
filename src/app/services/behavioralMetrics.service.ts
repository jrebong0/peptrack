import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import {EmployeeService} from './employee.service';
import {SprintsService} from './sprints.service';

@Injectable({
  providedIn: 'root'
})
export class BehavioralMetricsService {

    constructor(
        private db: AngularFirestore,
        private sprintsService: SprintsService,
        private employeeService: EmployeeService
    ) { }

    getQueryBehavioralMetrics(type: string) {
        console.log(type);
        return this.db.collection('behavioralMetrics').snapshotChanges().pipe(
            map(items=>{
                return items.map(
                    (item:any) => {
                        let id = item.payload.doc.id;
                        let data = item.payload.doc.data();
                        let newData = {
                            sprint: data.sprint,
                            employee: data.employee
                        }
                        newData[type] = data[type];
                        return {id, ...newData};
                    }
                );
            })
        );
    }

    getBehavioralByType(type: string) {
        return combineLatest(
            this.getQueryBehavioralMetrics(type),
            this.sprintsService.getSprintsList(),
            this.employeeService.getEmployees(),
            
        ).pipe(
            map(([behavioralMetrics, sprints, employees])=>{
                return behavioralMetrics.map(
                    item => {
                        const matchSprint = sprints.filter(sprint=>(sprint['id'] === item['sprint']['id']))[0];
                        const sprintName = matchSprint.name;
                        const matchEmployee = employees.filter(employee=>(employee['id'] === item['employee']['id']))[0];
                        const employeeName = matchEmployee.firstName.concat(' ', matchEmployee.lastName);
                        let newData = {
                            employeeName: employeeName,
                            sprintName: sprintName
                        };
                        return {...item, ...newData};
                    }
                );
            })
        );
    }

    updateBehavioralByType(list: any[], type: string) {
        list.map((item, index)=>{
            console.log('item', item, 'index', index);
            let itemToUpdate = {};
            itemToUpdate[type] = +item[type];
            console.log('itemToUpdate', itemToUpdate);
            this.db.collection('behavioralMetrics').doc(item.id).update(itemToUpdate);
        })
    }
}
