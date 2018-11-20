import { Component, OnInit } from '@angular/core';
import {UserAccessService} from '../services/user-access.service';
import {TardinessService} from '../services/tardiness.service';
import {EmployeeService} from '../services/employee.service';

@Component({
  selector: 'app-tardiness',
  templateUrl: './tardiness.component.html',
  styleUrls: ['./tardiness.component.css']
})
export class TardinessComponent implements OnInit {

    tardinessList = [];
    tardinessHeader = [
        {headerName: 'Employee', field: 'employee'},
        {headerName: 'Tardiness', field: 'tardiness'},
        {headerName: 'Key', field: 'key'}
    ];

  constructor(
      private userAccessService: UserAccessService,
      private tardinessService: TardinessService,
      private employeeService: EmployeeService
    ) { }

  ngOnInit() {
      this.employeeService
    this.tardinessService.getTardinessList().subscribe(list=>{
        console.log('getTardinessList', list);
        this.tardinessList = list;
    })
  }

  onProcessUpload(event) {
    console.log('onProcessUpload', event);
  }

  onUpdateEditData(event) {
    console.log(
        'onUpdateEditData', event, 
        'userAccessService', this.userAccessService.getUserToken(),
        'tardiness'
    );
  }
}
