import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Skill} from 'src/app/models/skill.model';
import {SkillsService} from 'src/app/services/skills.service';

@Component({
    selector: 'app-add-skill',
    templateUrl: './add-skill.component.html',
    styleUrls: ['./add-skill.component.css']
})
export class AddSkillComponent implements OnInit {
    showNameExist = false;
    skillList: Skill[] = [];
    skillForm = new FormGroup({
        name: new FormControl(null, [Validators.required])
    });

    constructor(
        public modalService: NgbActiveModal,
        private skillsService: SkillsService
    ) {}

    ngOnInit() {
        this.skillForm = new FormGroup({
            name: new FormControl(null, [Validators.required])
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

    onSubmitSkill() {
        if (this.checkIfNameAlreadyExist()) {
            this.showNameExist = true;
        } else {
            this.skillsService.addSkill(this.skillForm.value)
                .then(result => {
                    console.log('Success adding new team');
                    this.onCancel();
                }).catch(error => {
                    console.log('Error saving', error);
                })
        }
    }

    get name() {return this.skillForm.get('name');}

}
