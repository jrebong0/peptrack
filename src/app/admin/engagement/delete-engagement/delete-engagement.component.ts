import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EngagementService } from 'src/app/services/engagement.service';

@Component({
  selector: 'app-delete-engagement',
  templateUrl: './delete-engagement.component.html',
  styleUrls: ['./delete-engagement.component.css']
})
export class DeleteEngagementComponent {

  constructor(public activeModal: NgbActiveModal,
    private engagementService: EngagementService) { }

  onConfirmDelete(key: string) {
    this.engagementService.deleteEngagement(key);
    this.activeModal.close();
  }

  dismiss() {
    this.activeModal.close();
  }
}
