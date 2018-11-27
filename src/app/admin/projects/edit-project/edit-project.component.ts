import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { EngagementService } from 'src/app/services/engagement.service';
import { Engagement } from 'src/app/models/engagement.model';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent {
  projects: Project[];
  engagements: Engagement[];
  isExisting: boolean = false;
  errorMessage: string = "";
  errorRequiredMessage: string = "Project name is requried.";

  constructor(public activeModal: NgbActiveModal,
    private projectService: ProjectService,
    private engagementService: EngagementService) { }

  ngOnInit() {
    this.getProjectsAndEngagements();
  }

  getProjectsAndEngagements() {
    this.engagementService.getEngagementList().subscribe(
      (engagementList: any) => {
        this.engagements = engagementList;
      }
    );
    this.projectService.getCleanProjects().subscribe(
      (projectList: any) => {
        this.projects = projectList;
      }
    );
  }

  onSubmitUpdateProject(form: NgForm) {
    if(this.projects.some(
        project => project.name === form.value.updateName
      )) {
      this.isExisting = true;
      this.errorMessage = "Project name already exist.";
    }
    else {
      this.isExisting = false;
      this.projectService.updateProject(form);
      this.activeModal.close();
    }
  }

  dismiss() {
    this.activeModal.close();
  }

}
