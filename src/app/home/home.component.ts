import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { Engagement } from 'src/app/models/engagement.model';
import { EngagementService } from 'src/app/services/engagement.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
@NgModule({
  imports: [
    CommonModule
  ]
})
export class HomeComponent implements OnInit {
  engagements: Engagement[];
  constructor(
    private router: Router,
    private engagementService: EngagementService) { }

    ngOnInit() {
      this.getEngagements();
    }
  
    getEngagements() {
      this.engagementService.getEngagementList().subscribe(
        (engagementList: any) => {
          this.engagements = engagementList;
        }
      );
    }

  routeToPerformance(key) {
    //TODO: Update route including key
    this.router.navigate(["/performance"]);
  }

  routeToYTDPerformance(key) {
    //TODO: Update route including key
    console.log("YTD Clicked! " + key);
  }

}
