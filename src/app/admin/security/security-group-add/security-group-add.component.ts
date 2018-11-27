import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { SecurityGroupService } from 'src/app/services/security-group.service';
import { SecurityGroup } from 'src/app/models/security.group.model';

@Component({
  selector: 'app-security-group-add',
  templateUrl: './security-group-add.component.html',
  styleUrls: ['./security-group-add.component.css']
})
export class SecurityGroupAddComponent implements OnInit {
  securityGroups: SecurityGroup[];

  securityGroupForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      this.securityGroupNameValidator()
    ])
  });

  constructor(
    private securityGroupService: SecurityGroupService,
    public activeModal: NgbActiveModal
  ) {
    securityGroupService.getSecurityGroups()
      .subscribe(items => this.securityGroups = items);

  }

  ngOnInit() {

  }

  closeModal() {
    this.activeModal.close();
  }

  submit() {
    this.securityGroupService.addSecurityGroup(this.securityGroupForm.value);
  }

  securityGroupNameValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      // const forbidden = this.securityGroups.find(item => {
      //   return item.name == control.value;
      // });
      const forbidden = false;

      return forbidden ? {'forbiddenName': {value: control.value}} : null;
    }
  }
}
