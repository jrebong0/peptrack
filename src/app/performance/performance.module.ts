import { NgModule } from "@angular/core";
import { TardinessComponent } from "src/app/performance/behavioral/tardiness.component";
import { PerformanceRoutingModule } from "src/app/performance/performance-routing.module";
import { ReferenceService } from "src/app/services/reference.service";
import { PerformanceComponent } from "src/app/performance/performance.component";
import { CommonAppModule } from "src/app/common/common.module";

@NgModule({
  declarations: [
    TardinessComponent,
    PerformanceComponent
  ],
  imports: [
    PerformanceRoutingModule,
    CommonAppModule
  ],
  providers: [ReferenceService],
  entryComponents: [
  ],
  bootstrap: [PerformanceComponent]
})
export class PerformanceModule { }
