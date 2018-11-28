import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Engagement } from 'src/app/models/engagement.model';
import { EngagementService } from 'src/app/services/engagement.service';
import { AddEngagementComponent } from './add-engagement/add-engagement.component';
import { EditEngagementComponent } from './edit-engagement/edit-engagement.component';
import { DeleteEngagementComponent } from './delete-engagement/delete-engagement.component';

@Component({
  selector: 'app-engagement',
  templateUrl: './engagement.component.html',
  styleUrls: ['./engagement.component.css']
})
export class EngagementComponent implements OnInit {
  engagements: Engagement[];
  activeModal: NgbModalRef;
  updateEngagementData: Engagement;
  engagementToDelete: {
    name: string,
    key: string
  }

  constructor(private modalService: NgbModal,
    private engagementService: EngagementService) { }

  ngOnInit() {
    this.getEngagements();
  }

  getEngagements() {
    this.engagementService.getEngagementList().subscribe(
      (engagementList: any) => {
        this.engagements = engagementList;
      }
    );
  }

  open() {
    this.activeModal = this.modalService.open(AddEngagementComponent, {
      ariaLabelledBy: 'modal-basic-title'
    });
    this.activeModal.componentInstance.engagement = this.engagements;
    this.activeModal.result.then(result => {
      this.getEngagements();
    }, reason =>{
      console.log(reason);
    });
  }

  update(engagementUpdate: Engagement) {
    this.activeModal = this.modalService.open(EditEngagementComponent, {
      ariaLabelledBy: 'modal-basic-title'
    });

    this.activeModal.componentInstance.engagement = this.engagements;
    this.activeModal.componentInstance.updateEngagementData =
      Object.assign({}, engagementUpdate);

    this.activeModal.result.then(result => {
      this.getEngagements();
    }, reason =>{
      console.log(reason);
    })
  }

  delete(engagement: Engagement) {
    this.activeModal = this.modalService.open(DeleteEngagementComponent, {
      ariaLabelledBy: 'modal-basic-title'
    });
    this.engagementToDelete = {
      name: engagement.name,
      key: engagement.key
    };
    this.activeModal.componentInstance.engagementToDelete =
      this.engagementToDelete;
    this.activeModal.result.then(result => {
      this.getEngagements();
    }, reason =>{
      console.log(reason);
    });
  }
}
