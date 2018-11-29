import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { EmployeeService } from './employee.service';

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {

  constructor(private db: AngularFirestore,
    private employeeService: EmployeeService) { }

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

  getCleanPerformanceList() {
    return combineLatest([
        this.getPerformanceList(),
        this.employeeService.getEmployees()
    ]).pipe(
        map(([performanceList, pmList]) => {
            return performanceList.map(
                report => {
                    let pmKey = report.pmAssigned.path.split("/");
                    const assignedPM = pmList.find(pm => (
                        pm.id === pmKey[1]
                    ));
                    let reportData = {
                        pmAssigned: assignedPM.firstName
                            .concat(" ")
                            .concat(assignedPM.lastName)
                    }
                    return {...report, ...reportData};
                }
            );
        })
    )
  }
}
