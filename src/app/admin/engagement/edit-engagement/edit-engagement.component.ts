import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EngagementService } from 'src/app/services/engagement.service';
import { Engagement } from 'src/app/models/engagement.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-edit-engagement',
  templateUrl: './edit-engagement.component.html',
  styleUrls: ['./edit-engagement.component.css']
})
export class EditEngagementComponent implements OnInit {
  engagements: Engagement[];
  engagementList: Engagement[];
  updateEngagementData: Engagement;
  isExisting: boolean = false;
  errorMessage = "Engagement already exist.";
  errorRequiredMessage: string = "Engagement name is requried.";
  updateEngagementForm = new FormGroup({
    key: new FormControl(),
    updateName: new FormControl(null, [Validators.required])
  });

  constructor(public activeModal: NgbActiveModal,
    private engagementService: EngagementService) { }

  ngOnInit() {
    this.engagements = _.cloneDeep(this.engagementList);
    let selectedItem = _.cloneDeep(this.updateEngagementData);
    this.updateEngagementForm.setValue({
      key: selectedItem.key,
      updateName: selectedItem.name
    });
  }

  checkExistence() {
    if(this.engagements.some(
        engagement =>
        engagement.name === this.updateEngagementForm.value.updateName
      )) {
      this.isExisting = true;
    }
    else {
      this.isExisting = false
    }
  }

  onSubmitUpdateEngagement() {
    this.checkExistence();
    if(!this.isExisting) {
      this.engagementService.updateEngagement(this.updateEngagementForm.value);
      this.activeModal.close();
    }
  }

  dismiss() {
    this.activeModal.close();
  }

  get updatedName() {
    return this.updateEngagementForm.get('updateName');
  }
}
