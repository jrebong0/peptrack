import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { Engagement } from 'src/app/models/engagement.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  projects: Project[];
  projectList: Project[];
  engagements: Engagement[];
  engagementList: Engagement[];
  isExisting: boolean = false;
  errorMessage = "Project already exist.";
  errorRequiredMessage: string = "Project name is requried.";
  errorRequiredEngagement: string = "Engagement is requried.";
  addProjectForm = new FormGroup({
    projectName: new FormControl(null, [Validators.required]),
    engagementName: new FormControl(null, [Validators.required])
  });

  constructor(public activeModal: NgbActiveModal,
    private projectService: ProjectService) { }

  ngOnInit() {
    this.addProjectForm.reset();
    this.projects = _.cloneDeep(this.projectList);
    this.engagements = _.cloneDeep(this.engagementList);
  }

  checkExistence() {
    try {
      let nameExist = this.projects.filter(
        project => project.name === this.addProjectForm.value.projectName
      );
      let projectExist = nameExist.some(
        item => item.engagement === this.engagements.filter(
          item => item.key === this.addProjectForm.value.engagementName
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

  onSubmitAddProject() {
    this.checkExistence();
    if(!this.isExisting) {
      this.projectService.addProject(this.addProjectForm.value);
      this.activeModal.close();
    }
  }

  dismiss() {
    this.activeModal.close();
  }

  get newName() {
    return this.addProjectForm.get('projectName');
  }

  get engage() {
    return this.addProjectForm.get('engagementName');
  }

}
