import { Component, OnInit } from '@angular/core';
import { SecurityGroupService } from 'src/app/services/security-group.service';
import { SecurityGroup } from 'src/app/models/security.group.model';
import * as data from 'src/app/data/permissions.data';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css']
})
export class PermissionsComponent implements OnInit {
  securityGroups: SecurityGroup[];
  permissionList: string[];

  constructor(private securityGroupsService: SecurityGroupService) {
    }

  ngOnInit() {
    this.permissionList = this.chunk(data.permissionList, 10);

    this.securityGroupsService.getSecurityGroups().subscribe(
      items => {
        this.securityGroups = items;
        console.log(items);
        
      }
    );
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
}
