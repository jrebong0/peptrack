import { Component, OnInit } from '@angular/core';
import { BehavioralMetricsService } from 'src/app/services/behavioralMetrics.service';
import { UserAccessService } from 'src/app/services/user-access.service';


@Component({
  selector: 'app-tardiness',
  templateUrl: './tardiness.component.html',
  styleUrls: ['./tardiness.component.css']
})
export class TardinessComponent implements OnInit {

    tardinessList = [];
    tardinessHeader = [
        {headerName: 'Employee', field: 'employeeName'},
        {headerName: 'Srpint', field: 'sprintName'},
        {headerName: 'Tardiness', field: 'tardiness', editable: true},
    ];

  constructor(
      private userAccessService: UserAccessService,
      private behavioralMetricsService: BehavioralMetricsService
    ) { }

  ngOnInit() {
    this.behavioralMetricsService.getBehavioralByType('tardiness').subscribe((list:any)=>{
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
    this.behavioralMetricsService.updateBehavioralByType(event, 'tardiness');
  }
}
