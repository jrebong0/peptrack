import { Component, OnInit, ViewChild } from '@angular/core';
import {Studio} from '../models/studio.model';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-studio',
  templateUrl: './studio.component.html',
  styleUrls: ['./studio.component.css']
})
export class StudioComponent implements OnInit {
    @ViewChild('studioForm') studioForm: NgForm;

    towerList: string[] = ['A', 'B', 'C', 'D'];
    studioList: Studio[] = [];
    studioMode: string = 'add';

  constructor() { }

  ngOnInit() {

  }

  onSubmitStudio() {
      console.log('submit', this.studioForm);
  }

  checkModeState(mode: string) {
    return mode === this.studioMode;
  }

}
