import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { EngagementService } from 'src/app/services/engagement.service';
import { Engagement } from 'src/app/models/engagement.model';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent {
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

  onSubmitAddProject(form: NgForm) {
    if(this.projects.some(
        project => project.name === form.value.projectName
      )) {
      this.isExisting = true;
      this.errorMessage = "Project name already exist.";
    }
    else {
      this.isExisting = false;
      this.projectService.addProject(form);
      this.activeModal.close();
    }
  }

  dismiss() {
    this.activeModal.close();
  }

}
