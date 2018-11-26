import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {Studio} from '../models/studio.model';
import {NgForm} from '@angular/forms';
import {TowerService} from '../services/tower.service';
import {StudioService} from '../services/studio.service';

@Component({
  selector: 'app-studio',
  templateUrl: './studio.component.html',
  styleUrls: ['./studio.component.css']
})
export class StudioComponent implements OnInit, OnDestroy {
    @ViewChild('studioForm') studioForm: NgForm;

    // towerList: string[] = ['A', 'B', 'C', 'D'];
    towerList: any[] = [];
    studioList: Studio[] = [];
    editMode = false;
    editIndex = null;
    showNameExist = false;

  constructor(
      private towerService: TowerService,
      private studioService: StudioService
  ) { }

  ngOnInit() {
    this.towerService.getTowerList().subscribe(
        (list: any[]) => {
            this.towerList = list;
        },
        (error) => console.log('getTowerList response', error),
    );
    this.studioService.getStudioList().subscribe(
      (list: any[]) => {
           this.studioList = list;
      },
      (error) => console.log('getStudioList response', error),
    );
  }

    onSubmitStudio() {
        if (this.studioList.some(item=>(item.name === this.studioForm.value.name))) {
            this.showNameExist = true;
        } else {
            if (this.editMode) {
                // console.log('editmode', this.studioList.some(item=>(item.name === this.studioForm.value.name)));
                this.studioService.updateStudioList(this.studioForm.value, this.studioList[this.editIndex].key);
            } else {
                const studioName = this.studioForm.form;
                this.studioService.addStudio(this.studioForm.value);
            }
            this.onCancel();
        }
    }

  checkModeState() {
    return this.editMode;
  }

  ngOnDestroy() {
      this.editMode = false;
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
