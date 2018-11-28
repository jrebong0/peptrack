import { NgModule } from "@angular/core";
// import { TardinessComponent } from "src/app/performance/behavioral/tardiness.component";
import { PerformanceRoutingModule } from "src/app/performance/performance-routing.module";
import { ReferenceService } from "src/app/services/reference.service";
import { PerformanceComponent } from "src/app/performance/performance.component";
import { AddPerformanceReportComponent } from './add-performance-report/add-performance-report.component';
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    // TardinessComponent,
    PerformanceComponent,
    AddPerformanceReportComponent
  ],
  imports: [
    PerformanceRoutingModule,
    CommonModule
  ],
  providers: [ReferenceService],
  entryComponents: [
  ],
  bootstrap: [PerformanceComponent]
})
export class PerformanceModule { }
