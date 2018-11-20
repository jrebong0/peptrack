import { Component, OnInit } from '@angular/core';
import {UserAccessService} from '../services/user-access.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userAccessService: UserAccessService) { }

  ngOnInit() {
  }

  onProcessUpload(event) {
    console.log('onProcessUpload', event);
  }

  onUpdateEditData(event) {
    console.log('onUpdateEditData', event, 'userAccessService', );
    
  }

}
