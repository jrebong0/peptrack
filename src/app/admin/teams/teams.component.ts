import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgbModal, NgbModalRef, NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {Employee} from 'src/app/models/employee.model';
import {Team} from 'src/app/models/team.model';
import {EmployeeService} from 'src/app/services/employee.service';
import {TeamsService} from 'src/app/services/teams.service';
import {TowerService} from 'src/app/services/tower.service';
import {AddTeamComponent} from './add-team/add-team.component';
import {UpdateTeamComponent} from './update-team/update-team.component';
import {SkillsService} from 'src/app/services/skills.service';
import {Skill} from 'src/app/models/skill.model';

@Component({
    selector: 'app-teams',
    templateUrl: './teams.component.html',
    styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit, OnDestroy {
    activeModal: NgbModalRef;
    employeeList: Employee[] = [];
    skillList: Skill[] = [];
    teamList: Team[] = [];
    towerList: any[] = [];
    disableDelete = true;

    constructor(
        private towerService: TowerService,
        private teamsService: TeamsService,
        private skillsService: SkillsService,
        private employeeService: EmployeeService,
        private modalService: NgbModal
    ) {}

    ngOnInit() {
        this.towerService.getTowerList().subscribe(
            (list: any[]) => {
                this.towerList = list;
                console.log('towerList', this.towerList);
            },
            (error) => console.log('getTowerList response', error),
        );
        this.teamsService.getTeamList().subscribe(
            (list: any[]) => {
                console.log('updated teamList', list);
                this.teamList = list;
            },
            (error) => console.log('getTeamList response', error),
        );
        this.employeeService.getEmployees().subscribe(
            (list: Employee[]) => {
                console.log('Employee list', list);
                this.employeeList = list;
            }
        );
        this.skillsService.getSkills().subscribe(
            (list: Skill[]) => {
                console.log('Skill list', list);
                this.skillList = list;
            }
        );
    }

    ngOnDestroy() {
    }

    onAddTeam() {
        this.activeModal = this.modalService.open(AddTeamComponent);
        this.activeModal.componentInstance.employeeList = this.employeeList;
        this.activeModal.componentInstance.skillList = this.skillList;
        this.activeModal.componentInstance.towerList = this.towerList;
        this.activeModal.componentInstance.teamList = this.teamList;
    }

    onEditTeam(index: number) {
        this.activeModal = this.modalService.open(UpdateTeamComponent);
        this.activeModal.componentInstance.employeeList = this.employeeList;
        this.activeModal.componentInstance.skillList = this.skillList;
        this.activeModal.componentInstance.towerList = this.towerList;
        this.activeModal.componentInstance.teamList = this.teamList;
        this.activeModal.componentInstance.editIndex = index;
    }
}
