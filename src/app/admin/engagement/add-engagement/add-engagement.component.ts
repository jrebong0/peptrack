import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EngagementService } from 'src/app/services/engagement.service';
import { Engagement } from 'src/app/models/engagement.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-add-engagement',
  templateUrl: './add-engagement.component.html',
  styleUrls: ['./add-engagement.component.css']
})
export class AddEngagementComponent implements OnInit {
  engagements: Engagement[];
  engagementList: Engagement[];
  isExisting: boolean = false;
  errorMessage = "Engagement already exist.";
  errorRequiredMessage: string = "Engagement name is requried.";
  addEngagementForm = new FormGroup({
    engagementName: new FormControl(null, [Validators.required])
  });

  constructor(public activeModal: NgbActiveModal,
    private engagementService: EngagementService) { }

  ngOnInit() {
    this.addEngagementForm.reset();
    this.engagements = _.cloneDeep(this.engagementList);
  }

  checkExistence() {
    if(this.engagements.some(
      engagement =>
        engagement.name === this.addEngagementForm.value.engagementName
    )) {
      this.isExisting = true;
    }
    else {
      this.isExisting = false
    }
  }

  onSubmitAddEngagement() {
    this.checkExistence();
    if(!this.isExisting) {
      this.engagementService.addEngagement(this.addEngagementForm.value);
      this.activeModal.close();
    }
  }

  dismiss() {
    this.activeModal.close();
  }

  get newName() {
    return this.addEngagementForm.get('engagementName');
  }

}
