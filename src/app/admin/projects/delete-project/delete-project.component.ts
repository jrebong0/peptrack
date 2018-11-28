import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-delete-project',
  templateUrl: './delete-project.component.html',
  styleUrls: ['./delete-project.component.css']
})
export class DeleteProjectComponent {

  constructor(public activeModal: NgbActiveModal,
    private projectService: ProjectService) { }

  onConfirmDelete(key: string) {
    this.projectService.deleteProject(key);
    this.activeModal.close();
  }

  dismiss() {
    this.activeModal.close();
  }

}
