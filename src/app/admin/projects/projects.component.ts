import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { AddProjectComponent } from './add-project/add-project.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { DeleteProjectComponent } from './delete-project/delete-project.component';
import { EngagementService } from 'src/app/services/engagement.service';
import { Engagement } from 'src/app/models/engagement.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  updateProjectData: Project;
  selectedEngagementKey: string;
  projects: Project[];
  engagements: Engagement[];
  activeModal: NgbModalRef;
  projectToDelete: {
    name: string,
    key: string
  };

  constructor(private modalService: NgbModal,
    private projectService: ProjectService,
    private engagementService: EngagementService) { }

  ngOnInit() {
    this.getProjectList();
    this.engagementService.getEngagementList().subscribe(
      (list: any) => {
        this.engagements = list;
      }
    );
  }

  getProjectList() {
    this.projectService.getCleanProjects().subscribe(
      (list: any) => {
        this.projects = list;
      }
    );
  }

  open() {
    this.activeModal = this.modalService.open(AddProjectComponent, {
      ariaLabelledBy: 'modal-basic-title'
    });
    this.activeModal.componentInstance.projectList = this.projects;
    this.activeModal.componentInstance.engagementList = this.engagements;
    this.activeModal.result.then(result => {
      this.getProjectList();
    }, reason =>{
      console.log(reason);
    });
  }

  update(projectUpdate: Project) {
    this.activeModal = this.modalService.open(EditProjectComponent, {
      ariaLabelledBy: 'modal-basic-title'
    });
    this.activeModal.componentInstance.projectList = this.projects;
    this.activeModal.componentInstance.updateProjectData =
      Object.assign({}, projectUpdate);
    this.activeModal.componentInstance.engagementList = this.engagements;
    this.activeModal.result.then(result => {
      this.getProjectList();
    }, reason =>{
      console.log(reason);
    })
  }

  delete(project: Project) {
    this.activeModal = this.modalService.open(DeleteProjectComponent, {
      ariaLabelledBy: 'modal-basic-title'
    });
    this.projectToDelete = {
      name: project.name,
      key: project.key
    };
    this.activeModal.componentInstance.projectToDelete = this.projectToDelete;
    this.activeModal.result.then(result => {
      this.getProjectList();
    }, reason =>{
      console.log(reason);
    });
  }
}
