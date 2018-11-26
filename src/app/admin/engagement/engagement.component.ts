import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Engagement } from 'src/app/models/engagement.model';
import { EngagementService } from 'src/app/services/engagement.service';

@Component({
  selector: 'app-engagement',
  templateUrl: './engagement.component.html',
  styleUrls: ['./engagement.component.css']
})
export class EngagementComponent implements OnInit {
  engagements: Engagement[];
  activeModal: NgbModalRef;
  isExisting: boolean = false;
  updateEngagementData: Engagement;
  errorMessage: string = "";
  errorRequiredMessage: string = "Engagement name is requried.";
  engagementToDelete: {
    name: string,
    key: string
  }

  constructor(private modalService: NgbModal,
    private engagementService: EngagementService) { }

  ngOnInit() {
    this.engagementService.getEngagementList().subscribe(
      (engagementList: any) => {
        this.engagements = engagementList;
      }
    );
  }

  onSubmitAddEngagement(form: NgForm) {
    if(this.engagements.some(
        engagement => engagement.name === form.value.engagementName
      )) {
      this.isExisting = true;
      this.errorMessage = "Engagement name already exist.";
    }
    else {
      this.isExisting = false
      this.engagementService.addEngagement(form);
      this.activeModal.close();
    }
  }

  onSubmitUpdateEngagement(form: NgForm) {
    if(this.engagements.some(
        engagement => engagement.name === form.value.updateName
      )) {
      this.isExisting = true;
      this.errorMessage = "Engagement name already exist.";
    }
    else {
      this.isExisting = false
      this.engagementService.updateEngagement(form);
      this.activeModal.close();
    }
  }

  open(modal) {
    this.activeModal = this.modalService.open(modal, {
      ariaLabelledBy: 'modal-basic-title'
    });
  }

  fillUpdateForm(content: any, EngagementUpdate: Engagement) {
    this.open(content);
    this.updateEngagementData = Object.assign({}, EngagementUpdate);
  }

  confirmEngagementDelete(content: any, engagement: Engagement) {
    this.open(content);
    this.engagementToDelete = {
      name: engagement.name,
      key: engagement.key
    };
  }

  onConfirmDelete(key: string) {
    this.engagementService.deleteEngagement(key);
    this.activeModal.close();
  }
}
