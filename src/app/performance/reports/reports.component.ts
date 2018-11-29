import { Component, OnInit } from '@angular/core';
import { PerformanceService } from '../../services/performance.service';
import { Report } from '../../models/report.model';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  reports: Report[];

  constructor(private performanceService: PerformanceService) { }

  ngOnInit() {
    this.getReports();

  }

  getReports() {
    this.performanceService.getCleanPerformanceList().subscribe(
      (list: any) => {
        this.reports = list;
        console.log(this.reports);
      }
    );
  }
}
