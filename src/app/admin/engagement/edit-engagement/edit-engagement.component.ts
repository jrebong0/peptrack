import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EngagementService } from 'src/app/services/engagement.service';
import { Engagement } from 'src/app/models/engagement.model';

@Component({
  selector: 'app-edit-engagement',
  templateUrl: './edit-engagement.component.html',
  styleUrls: ['./edit-engagement.component.css']
})
export class EditEngagementComponent {
  engagements: Engagement[];
  isExisting: boolean = false;
  errorMessage: string = "";
  errorRequiredMessage: string = "Engagement name is requried.";

  constructor(public activeModal: NgbActiveModal,
    private engagementService: EngagementService) { }

  ngOnInit() {
    this.engagementService.getEngagementList().subscribe(
      (engagementList: any) => {
        this.engagements = engagementList;
      }
    );
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

  dismiss() {
    this.activeModal.close();
  }
}
