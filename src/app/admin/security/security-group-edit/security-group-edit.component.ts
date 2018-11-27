import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { SecurityGroup } from 'src/app/models/security.group.model';
import { ActivatedRoute } from '@angular/router';
import { SecurityGroupService } from 'src/app/services/security-group.service';
import * as data from 'src/app/data/permissions.data';

@Component({
  selector: 'app-security-group-edit',
  templateUrl: './security-group-edit.component.html',
  styleUrls: ['./security-group-edit.component.css']
})
export class SecurityGroupEditComponent implements OnInit {
  securityGroup: SecurityGroup = new SecurityGroup();
  permissionsFormGroup: FormGroup  = new FormGroup({});
  permissionMatrix = {};


  constructor(
    private route: ActivatedRoute,
    private securityGroupService: SecurityGroupService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.permissionMatrix = data.permissionMatrix;
    this.buildFormControls('');

    this.route.params.subscribe(
      (params) => {
        this.securityGroupService.getById(params.id)
          .subscribe(
            async item => {
              this.securityGroup = item
              this.buildFormControls(item.permissions);
            }
          );
      }
    );
  }

  /**
   * Build Form Controls
   * @param permissions string
   * @todo refactor method
   */
  buildFormControls(permissions: string) {
    const employeeControls = this.formBuilder.group({});
    data.permissionMatrix.records.employee.map(item => {
      employeeControls.addControl(
        item,
        this.formBuilder.control(permissions.indexOf(item) >= 0)
      );
    });

    const engagementControls = this.formBuilder.group({});
    data.permissionMatrix.records.engagement.map(item => {
      engagementControls.addControl(
        item,
        this.formBuilder.control(permissions.indexOf(item) >= 0)
      );
    });

    const projectControls = this.formBuilder.group({});
    data.permissionMatrix.records.project.map(item => {
      projectControls.addControl(
        item,
        this.formBuilder.control(permissions.indexOf(item) >= 0)
      );
    });

    const teamControls = this.formBuilder.group({});
    data.permissionMatrix.records.team.map(item => {
      teamControls.addControl(
        item,
        this.formBuilder.control(permissions.indexOf(item) >= 0)
      );
    });

    const performanceControls = this.formBuilder.group({});
    data.permissionMatrix.records.performance.map(item => {
      performanceControls.addControl(
        item,
        this.formBuilder.control(permissions.indexOf(item) >= 0)
      );
    });

    const specialControls = this.formBuilder.group({});
    data.permissionMatrix.specials.map(item => {
      specialControls.addControl(
        item,
        this.formBuilder.control(permissions.indexOf(item) >= 0)
      );
    });

    const pageControls = this.formBuilder.group({});
    data.permissionMatrix.pages.map(item => {
      pageControls.addControl(
        item,
        this.formBuilder.control(permissions.indexOf(item) >= 0)
      );
    });

    this.permissionsFormGroup = this.formBuilder.group({
      employee: employeeControls,
      engagement: engagementControls,
      project: projectControls,
      team: teamControls,
      performance: performanceControls,
      special: specialControls,
      page: pageControls
    });
  }

  transform(value: string) {
    if (value ==='') {
    return value;
    }
    
    value = value.replace(/([^A-Z])([A-Z])/g, '$1 $2').replace(/([A-Z])([A-Z][^A-Z])/g, '$1 $2');
    value = value[0].toUpperCase() + value.slice(1);
    return value;
  }

  submit() {
    const permissionsString = this.generatePermissionString(this.permissionsFormGroup.value);
    const data = {
      id: this.securityGroup.id,
      permissions: permissionsString
    }
    this.securityGroupService.editSecurityGroup(data);
  }

  generatePermissionString(formData:{}) {
    let permissionsArray:string[] = [];
    Object.keys(this.permissionsFormGroup.value).forEach(item => {
      Object.keys(this.permissionsFormGroup.value[item]).forEach(key => {
        if(this.permissionsFormGroup.value[item][key]) {
          permissionsArray.push(key);
        }
      });
    });
    return permissionsArray.join(',');
  }
}
