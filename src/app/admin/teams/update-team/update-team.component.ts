import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import {merge, Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {Employee} from 'src/app/models/employee.model';
import {Team} from 'src/app/models/team.model';
import {TeamsService} from 'src/app/services/teams.service';

@Component({
    selector: 'app-update-team',
    templateUrl: './update-team.component.html',
    styleUrls: ['./update-team.component.css']
})
export class UpdateTeamComponent implements OnInit {
    teamList: Team[] = [];
    reserveList: Employee[] = [];
    employeeList: Employee[] = [];
    teamForm = new FormGroup({
        name: new FormControl(null, [Validators.required, Validators.minLength(2)]),
        project: new FormControl(null, [Validators.required]),
        members: new FormControl([])
    });
    membersForm: FormGroup;
    showNameExist = false;
    focus$ = new Subject<string>();
    click$ = new Subject<string>();
    editTeamData: Team;
    editIndex = null;

    constructor(
        public modalService: NgbActiveModal,
        private teamsService: TeamsService,
    ) {}

    ngOnInit() {
        this.editTeamData = _.cloneDeep(this.teamList[this.editIndex]);
        let {name, project, employees} = this.editTeamData;
        employees = employees ? employees : [];
        console.log('project', project)
        this.teamForm.setValue({
            name: name,
            project: project,
            members: employees
        });
        this.membersForm = new FormGroup({
            employee: new FormControl(null, [Validators.required]),
            skill: new FormControl(null, [Validators.required]),
        });
        this.reserveList = _.cloneDeep(this.employeeList);
        this.reserveList.forEach((item, index) => {
            const getIndex = employees.findIndex(emp => emp.employee.id === item.id);
            if (getIndex >= 0) this.reserveList.splice(index, 1);
        })
    }

    checkIfNameAlreadyExist() {
        return this.teamList.some(item => (item.name === this.teamForm.get('name').value));
    }

    onAddMember() {
        const getIndex = this.reserveList.findIndex(item => item.id === this.membersForm.value.employee.id);
        this.reserveList.splice(getIndex, 1);
        this.membersList.value.push(this.membersForm.value);
        this.membersForm.reset();
    }

    onRemoveMember(index: number) {
        this.membersList.value.splice(index, 1);
    }

    onCancel() {
        this.showNameExist = false;
        this.teamForm.reset();
        this.modalService.close();
    }

    proceedToSaveEdit() {
        this.teamsService.updateTeam(this.teamForm.value, this.editTeamData.key)
            .then(result => {
                console.log('Success updating team');
                this.onCancel();
            }).catch(error => {
                console.log('Error updating team', error);
            })
    }

    onSubmitTeam() {
        if (this.teamForm.get('name').value === this.editTeamData.name) {
            this.proceedToSaveEdit();
        } else {
            // the name change, need to check if the name change is same with the other team name
            if (this.checkIfNameAlreadyExist()) {
                this.showNameExist = true;
            } else {
                this.proceedToSaveEdit();
            }
        }
    }

    clickEvents($event, typeaheadInstance) {
        if (typeaheadInstance.isPopupOpen()) {
            this.click$.next($event.target.value);
        }
    }
    search = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
        return merge(debouncedText$, this.focus$, this.click$).pipe(
            map(term => {
                return (term === '' ?
                    this.reserveList :
                    (
                        this.reserveList.filter(
                            employee => {
                                return employee.firstName.toLowerCase().indexOf(term.toLowerCase()) > -1
                            }
                        ).slice(0, 10)
                    )
                );
            })
        );
    };
    formatter = (x: Employee) => {
        return x.firstName.concat(' ', x.lastName);
    }

    get teamFormName() {return this.teamForm.get('name');}
    get teamFormProject() {return this.teamForm.get('project');}
    get membersList() {return this.teamForm.get('members');}
}
