import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ReferenceService } from './reference.service';
import { map } from 'rxjs/operators';
import {Employee} from '../models/employee.model';
import {EmployeeService} from './employee.service';
import {combineLatest} from 'rxjs';
import {UserAccessService} from './user-access.service';
import {SkillsService} from './skills.service';
import {Skill} from '../models/skill.model';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

    constructor(private db: AngularFirestore,
        private userAccessService: UserAccessService,
        private refService: ReferenceService,
        private employeeService: EmployeeService,
        private skillsService: SkillsService
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
            this.skillsService.getSkills()
        ).pipe(
            map(([employeeList, teamsList, skillsList]) => 
                {
                    return teamsList.map(
                        (team) => {
                            if(team.employees) {
                                const matchData = [];
                                team.employees.map(emp=>{
                                    const parseEmp = JSON.parse(emp);
                                    console.log('parseEmp', parseEmp);
                                    const matchEmployee = employeeList.filter(employee=>(employee['id'] === parseEmp['employee']))[0];
                                    const matchSkill = skillsList.filter(skill=>(skill['id'] === parseEmp['skill']))[0];
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
            let itemToString = JSON.stringify({employee: item.employee.id, skill: item.skill.id});
            return itemToString;
        })
    }

    updateTeam(editItem: {name: string, tower: string, members: [{employee: Employee, skill: Skill}]}, key: string) {
        let newTowerRef = this.refService.getReferencePath(editItem.tower);
        let formattedMembers = this.formatMembersData(editItem.members);
        let userLoginRef = this.db.collection('employees').doc(this.userAccessService.hasUserLoggedIn()).ref;
        let updatedData = {
            name: editItem.name,
            tower: newTowerRef,
            employees: formattedMembers,
            updatedBy: userLoginRef,
            dateUpdated: new Date()
        };
        return this.db.collection('teams').doc(key).update(updatedData);
    }

    addTeam(item: {name: string, tower: string, members: [{employee: Employee, skill: Skill}]}) {
        let newTowerRef = this.refService.getReferencePath(item.tower);
        let formattedMembers = this.formatMembersData(item.members);
        let userLoginRef = this.db.collection('employees').doc(this.userAccessService.hasUserLoggedIn()).ref;
        let addData = {
            name: item.name,
            tower: newTowerRef,
            employees: formattedMembers,
            type: 'admin',
            createdBy: userLoginRef,
            dateCreated: new Date()
        };
        return this.db.collection('teams').add(addData);
    }
}
