import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { Engagement } from 'src/app/models/engagement.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit{
  @Input()
  updateProjectData: Project;
  projects: Project[];
  projectList: Project[];
  engagements: Engagement[];
  engagementList: Engagement[];
  isExisting: boolean = false;
  errorRequiredMessage: string = "Project name is requried.";
  errorMessage: string = "Project already exist.";
  updateProject: any;
  editProjectForm = new FormGroup({
    key: new FormControl(),
    updateName: new FormControl(null, [Validators.required]),
    engagementName: new FormControl(null, [Validators.required])
  });

  constructor(public activeModal: NgbActiveModal,
    private projectService: ProjectService) { }

  ngOnInit() {
    this.editProjectForm.reset();
    this.projects = _.cloneDeep(this.projectList);
    this.updateProject = _.cloneDeep(this.updateProjectData);
    this.editProjectForm.setValue({
      key: this.updateProject.key,
      updateName: this.updateProject.name,
      engagementName: this.engagementList.filter(
        item => item.name === this.updateProject.engagement
      )[0].key
    });
  }

  checkExistence() {
    try {
      let nameExist = this.projects.filter(
        project => project.name === this.editProjectForm.value.updateName
      );
      let projectExist = nameExist.some(
        item => item.engagement === this.engagementList.filter(
          item => item.key === this.editProjectForm.value.engagementName
        )[0].name
      );
      if(projectExist) {
        this.isExisting = true;
      }
      else {
        this.isExisting = false;
      }
    } catch(e) {}

  }

  onSubmitUpdateProject() {
    this.checkExistence();
    if(!this.isExisting) {
      this.projectService.updateProject(this.editProjectForm.value);
      this.activeModal.close();
    }
  }

  dismiss() {
    this.activeModal.close();
  }

  get updatedName() {
    return this.editProjectForm.get('updateName');
  }

  get updatedEngagement() {
    return this.editProjectForm.get('engagementName');
  }

}
