import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { Engagement } from 'src/app/models/engagement.model';
import { EngagementService } from 'src/app/services/engagement.service';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ ProjectService ]
})
export class ProjectsComponent implements OnInit {
  updateProjectData: Project;
  projects: Project[];
  engagements: Engagement[];
  isExisting: boolean = false;
  errorMessage: string = "";
  errorRequiredMessage: string = "Project name is requried.";
  activeModal: NgbModalRef;
  projectToDelete: {
    name: string,
    key: string
  };

  constructor(private modalService: NgbModal,
    private projectService: ProjectService,
    private engagementService: EngagementService) { }

  ngOnInit() {
    combineLatest([
      this.projectService.getProjectList(),
      this.engagementService.getEngagementList()
    ]).pipe(
      map(([projectList, engagementList]) => {
        return projectList.map(
          project => {
            const assocEngagement = engagementList.find(engage => (
              engage.key === project.engagement.id
            ));
            let projectData = {
              engagement: assocEngagement.name
            }
            return {...project, ...projectData};
          }
        );
      })
    ).subscribe(
      (list: any) => {
        this.projects = list;
      }
    );

    this.engagementService.getEngagementList().subscribe(
      (engagementList: any) => {
        this.engagements = engagementList;
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

  open(modal) {
    this.activeModal = this.modalService.open(modal, {
      ariaLabelledBy: 'modal-basic-title'
    });
  }

  fillUpdateForm(content: any, ProjectUpdate: Project) {
    this.open(content);
    this.updateProjectData = Object.assign({}, ProjectUpdate);
  }

  confirmProjectDelete(content: any, project: Project) {
    this.open(content);
    this.projectToDelete = {
      name: project.name,
      key: project.key
    };
  }

  onConfirmDelete(key: string) {
    this.projectService.deleteProject(key);
    this.activeModal.close();
  }

}
