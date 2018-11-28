import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import {Skill} from 'src/app/models/skill.model';
import {SkillsService} from 'src/app/services/skills.service';

@Component({
    selector: 'app-update-skill',
    templateUrl: './update-skill.component.html',
    styleUrls: ['./update-skill.component.css']
})
export class UpdateSkillComponent implements OnInit {
    showNameExist = false;
    skillList: Skill[] = [];
    skillForm = new FormGroup({
        name: new FormControl(null, [Validators.required])
    });
    editIndex = null;
    editSkillData: Skill;

    constructor(
        public modalService: NgbActiveModal,
        private skillsService: SkillsService
    ) {}

    ngOnInit() {
        this.editSkillData = _.cloneDeep(this.skillList[this.editIndex]);
        let {name} = this.editSkillData;
        this.skillForm.setValue({
            name: name,
        });
    }

    checkIfNameAlreadyExist() {
        return this.skillList.some(item => (item.name === this.skillForm.get('name').value));
    }

    onCancel() {
        this.showNameExist = false;
        this.skillForm.reset();
        this.modalService.close();
    }

    proceedToSaveEdit() {
        this.skillsService.updateSkill(this.skillForm.value, this.editSkillData.id)
            .then(result => {
                console.log('Success updating team');
                this.onCancel();
            }).catch(error => {
                console.log('Error updating team', error);
            })
    }

    onSubmitSkill() {
        if (this.skillForm.get('name').value === this.editSkillData.name) {
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

    get name() {return this.skillForm.get('name');}
}
