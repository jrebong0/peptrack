import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Employee} from 'src/app/models/employee.model';
import {Skill} from 'src/app/models/skill.model';
import {Team} from 'src/app/models/team.model';
import {EmployeeService} from 'src/app/services/employee.service';
import {ProjectService} from 'src/app/services/project.service';
import {SkillsService} from 'src/app/services/skills.service';
import {TeamsService} from 'src/app/services/teams.service';
import {AddTeamComponent} from './add-team/add-team.component';
import {UpdateTeamComponent} from './update-team/update-team.component';

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
    projectList: any[] = [];
    disableDelete = true;

    constructor(
        private projectService: ProjectService,
        private teamsService: TeamsService,
        private skillsService: SkillsService,
        private employeeService: EmployeeService,
        private modalService: NgbModal
    ) {}

    ngOnInit() {
        this.projectService.getProjectList().subscribe(
            (list: any[]) => {
                this.projectList = list;
            },
            (error) => console.log('getTowerList error response', error),
        );
        this.teamsService.getTeamList().subscribe(
            (list: any[]) => {
                this.teamList = list;
            },
            (error) => console.log('getTeamList error response', error),
        );
        this.employeeService.getEmployees().subscribe(
            (list: Employee[]) => {
                this.employeeList = list;
            },
            (error) => console.log('employeeService error response', error),
        );
        this.skillsService.getSkills().subscribe(
            (list: Skill[]) => {
                this.skillList = list;
            },
            (error) => console.log('skillsService error response', error),
        );
    }

    ngOnDestroy() {
    }

    onAddTeam() {
        this.activeModal = this.modalService.open(AddTeamComponent);
        this.activeModal.componentInstance.employeeList = this.employeeList;
        this.activeModal.componentInstance.skillList = this.skillList;
        this.activeModal.componentInstance.projectList = this.projectList;
        this.activeModal.componentInstance.teamList = this.teamList;
    }

    onEditTeam(index: number) {
        this.activeModal = this.modalService.open(UpdateTeamComponent);
        this.activeModal.componentInstance.employeeList = this.employeeList;
        this.activeModal.componentInstance.skillList = this.skillList;
        this.activeModal.componentInstance.projectList = this.projectList;
        this.activeModal.componentInstance.teamList = this.teamList;
        this.activeModal.componentInstance.editIndex = index;
    }
}
