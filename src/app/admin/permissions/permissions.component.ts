import { Component, OnInit, ViewChild } from '@angular/core';
import { SecurityGroupService } from 'src/app/services/security-group.service';
import { SecurityGroup } from 'src/app/models/security.group.model';
import * as data from 'src/app/data/permissions.data';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css']
})
export class PermissionsComponent implements OnInit {
  @ViewChild('permissionsForm') permissionsForm: NgForm;
  securityGroups: SecurityGroup[];
  authorizationMatrix: {};
  accessRecords: {};
  accessSpecial: {};
  securityGroup: SecurityGroup;
  objKeys = Object.keys;

  constructor(
    private securityGroupsService: SecurityGroupService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.accessRecords = data.authorizationMatrix.records;
    this.accessSpecial = data.authorizationMatrix.special;

    this.securityGroupsService.getSecurityGroups().subscribe(
      async items => {
        this.securityGroups = items;

        this.route.params.subscribe(
          (params) => {
            this.securityGroup = items.find(x => x.id == params['id']);
          }
        );
      }
    );
  }

  openAddGroupDialog() {
    alert('This is a test');
  }

  chunk (arr, len) {
    let chunks = [],
        i = 0,
        n = arr.length;

    while (i < n) {
      chunks.push(arr.slice(i, i += len));
    }

    return chunks;
  }

  hasPermission(key: string) {
    if(this.securityGroup && this.securityGroup.permissions) {
      return this.securityGroup.permissions.indexOf(key) >= 0 ? true : false;
    }
    return false;
  }
}
