import { Component, OnInit } from '@angular/core';
import { SecurityGroup } from 'src/app/models/security.group.model';
import { SecurityGroupService } from 'src/app/services/security-group.service';
import { ActivatedRoute } from '@angular/router';
import { SecurityGroupAddComponent } from './security-group-add/security-group-add.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SecurityGroupDeleteComponent } from './security-group-delete/security-group-delete.component';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {
  securityGroups: SecurityGroup[];
  activeModal: NgbModalRef;

  constructor(
    private securityGroupsService: SecurityGroupService,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.securityGroupsService.getSecurityGroups().subscribe(
      items => {
        this.securityGroups = items.map(item => {
          let group = new SecurityGroup();
          return {...group, ...item};
        });
      }
    );
    
  }

  openAddGroupDialog() {
    this.activeModal = this.modalService.open(SecurityGroupAddComponent);
  }

  openDeleteGroupDialog(securityGroup) {
    this.activeModal = this.modalService.open(SecurityGroupDeleteComponent);
    this.activeModal.componentInstance.securityGroup = securityGroup;
  }
}
