import { NgModule } from "@angular/core";
// import { TardinessComponent } from "src/app/performance/behavioral/tardiness.component";
import { PerformanceRoutingModule } from "src/app/performance/performance-routing.module";
import { ReferenceService } from "src/app/services/reference.service";
import { PerformanceComponent } from "src/app/performance/performance.component";
import { CommonModule } from "@angular/common";
import { CommonAppModule } from "../common/common.module";
import { ReportsComponent } from './reports/reports.component';
import { AddReportComponent } from './reports/add-report/add-report.component';

@NgModule({
  declarations: [
    // TardinessComponent,
    PerformanceComponent,
    ReportsComponent,
    AddReportComponent
  ],
  imports: [
    PerformanceRoutingModule,
    CommonModule,
    CommonAppModule
  ],
  providers: [ReferenceService],
  entryComponents: [
  ],
  bootstrap: [PerformanceComponent]
})
export class PerformanceModule { }
