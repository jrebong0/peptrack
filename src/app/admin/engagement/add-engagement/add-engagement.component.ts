import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EngagementService } from 'src/app/services/engagement.service';
import { Engagement } from 'src/app/models/engagement.model';

@Component({
  selector: 'app-add-engagement',
  templateUrl: './add-engagement.component.html',
  styleUrls: ['./add-engagement.component.css']
})
export class AddEngagementComponent {
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

  dismiss() {
    this.activeModal.close();
  }

}
