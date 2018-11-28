import { Component, OnInit, Input } from '@angular/core';
import { SecurityGroup } from 'src/app/models/security.group.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SecurityGroupService } from 'src/app/services/security-group.service';

@Component({
  selector: 'app-security-group-delete',
  templateUrl: './security-group-delete.component.html',
  styleUrls: ['./security-group-delete.component.css']
})
export class SecurityGroupDeleteComponent implements OnInit {
  @Input() securityGroup: SecurityGroup;

  constructor(
    private securityGroupService: SecurityGroupService,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() { }

  closeModal() {
    this.activeModal.close();
  }

  submit() {
    this.securityGroupService.deleteSecurityGroup(this.securityGroup);
    this.closeModal();
  }
}
