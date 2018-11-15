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
    editMode = false;
    editIndex = null;

  constructor() { }

  ngOnInit() {

  }

  onSubmitStudio() {
    console.log('submit', this.studioForm);
    if(this.editMode) {
        this.studioList.splice(this.editIndex, 1);
    }
    this.studioList.unshift(this.studioForm.value);
    this.onCancel();
  }

  checkModeState() {
    return this.editMode;
  }

  onEditStudio(index: number) {
      this.editIndex = index;
      this.studioForm.controls['name'].setValue(this.studioList[index].name);
      this.studioForm.controls['tower'].setValue(this.studioList[index].tower);
      this.editMode = true;
  }

  onCancel() {
    this.editMode = false;
    this.studioForm.reset();
  }

}
