import {Component, OnInit} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Skill} from 'src/app/models/skill.model';
import {SkillsService} from 'src/app/services/skills.service';
import {AddSkillComponent} from './add-skill/add-skill.component';
import {UpdateSkillComponent} from './update-skill/update-skill.component';

@Component({
    selector: 'app-skills',
    templateUrl: './skills.component.html',
    styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
    activeModal: NgbModalRef;
    skills: Skill[] = [];
    disableDelete = true; // temporary set to true

    constructor(
        private skillService: SkillsService,
        private modalService: NgbModal
    ) {}

    ngOnInit() {
        this.skillService.getSkills().subscribe(
            list => {
                this.skills = list;
            }
        )
    }

    onAddSkill() {
        console.log('onAddSkill');
        this.activeModal = this.modalService.open(AddSkillComponent);
        this.activeModal.componentInstance.skillList = this.skills;
    }

    onEditSkill(index: number) {
        console.log('onEditSkill', index);
        this.activeModal = this.modalService.open(UpdateSkillComponent);
        this.activeModal.componentInstance.skillList = this.skills;
        this.activeModal.componentInstance.editIndex = index;
    }

}
