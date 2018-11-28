import { Component, OnInit } from '@angular/core';
import { PerformanceService } from '../services/performance.service';
import { Performance } from '../models/performance.model';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.css']
})
export class PerformanceComponent implements OnInit {
  reports: Performance[];

  constructor(private performanceService: PerformanceService) { }

  ngOnInit() {
    this.getReports();
  }

  getReports() {
    this.performanceService.getPerformanceList().subscribe(
      (list: any) => {
        this.reports = list;
        console.log(this.reports);
      }
    );
  }

}
