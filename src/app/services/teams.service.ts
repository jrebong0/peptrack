import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ReferenceService } from './reference.service';
import { map } from 'rxjs/operators';
import {Employee} from '../models/employee.model';
import {Role} from '../models/role.model';
import {EmployeeService} from './employee.service';
import {combineLatest} from 'rxjs';
import {RolesService} from './roles.service';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

    constructor(private db: AngularFirestore,
        private refService: ReferenceService,
        private employeeService: EmployeeService,
        private rolesService: RolesService
    ) { }

    queryTeamsList() {
        return this.db.collection('teams').snapshotChanges().pipe(
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

    getTeamList() {
        return combineLatest(
            this.employeeService.getEmployees(),
            this.queryTeamsList(),
            this.rolesService.getRoles()
        ).pipe(
            map(([employeeList, teamsList, rolesList]) => 
                {
                    return teamsList.map(
                        (team) => {
                            if(team.employees) {
                                const matchData = [];
                                team.employees.map(emp=>{
                                    const parseEmp = JSON.parse(emp);
                                    const matchEmployee = employeeList.filter(employee=>(employee['id'] === parseEmp['employee']))[0];
                                    const matchSkill = rolesList.filter(role=>(role['id'] === parseEmp['role']))[0];
                                    matchData.push({
                                        employee: matchEmployee,
                                        skill: matchSkill
                                    });
                                });
                                team.employees = matchData;
                                return {...team}
                            } else {
                                return team;
                            }
                        }
                    )
                }
            )
        )
    }

    formatMembersData(data) {
        return data.map(item=>{
            let itemToString = JSON.stringify({employee: item.employee.id, role: item.skill.id});
            return itemToString;
        })
    }

    updateTeam(editItem: {name: string, tower: string, members: [{employee: Employee, skill: Role}]}, key: string) {
        let newTowerRef = this.refService.getReferencePath(editItem.tower);
        let formattedMembers = this.formatMembersData(editItem.members);
        let updatedData = {
            name: editItem.name,
            tower: newTowerRef,
            employees: formattedMembers
        };
        return this.db.collection('teams').doc(key).update(updatedData);
    }

    addTeam(item: {name: string, tower: string, members: [{employee: Employee, skill: Role}]}) {
        let newTowerRef = this.refService.getReferencePath(item.tower);
        let formattedMembers = this.formatMembersData(item.members);
        let addData = {
            name: item.name,
            tower: newTowerRef,
            employees: formattedMembers,
            type: 'admin'
        };
        return this.db.collection('teams').add(addData);
    }
}
