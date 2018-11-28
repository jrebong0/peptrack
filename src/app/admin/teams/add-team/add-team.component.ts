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
    selector: 'app-add-team',
    templateUrl: './add-team.component.html',
    styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {
    teamList: Team[] = [];
    reserveList: Employee[] = [];
    employeeList: Employee[] = [];
    teamForm = new FormGroup({
        name: new FormControl(null, [Validators.required]),
        tower: new FormControl(null, [Validators.required]),
        members: new FormControl([])
    });
    membersForm: FormGroup;
    showNameExist = false;
    focus$ = new Subject<string>();
    click$ = new Subject<string>();

    constructor(
        public modalService: NgbActiveModal,
        private teamsService: TeamsService,
    ) {}

    ngOnInit() {
        this.teamForm = new FormGroup({
            name: new FormControl(null, [Validators.required]),
            tower: new FormControl(null, [Validators.required]),
            members: new FormControl([]),
        });
        this.membersForm = new FormGroup({
            employee: new FormControl(null, [Validators.required]),
            skill: new FormControl(null, [Validators.required]),
        });
        this.reserveList = _.cloneDeep(this.employeeList);
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

    onSubmitTeam() {
        if (this.checkIfNameAlreadyExist()) {
            this.showNameExist = true;
        } else {
            this.teamsService.addTeam(this.teamForm.value)
                .then(result => {
                    console.log('Success adding new team');
                    this.onCancel();
                }).catch(error => {
                    console.log('Error saving', error);
                })
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
    get teamFormTower() {return this.teamForm.get('tower');}
    get membersList() {return this.teamForm.get('members');}
}
