import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Tower } from 'src/app/models/tower.model';
import { NgForm } from '@angular/forms';
import { TowerService } from 'src/app/services/tower.service';

@Component({
  selector: 'app-add-tower-dialog',
  templateUrl: './add-tower-dialog.component.html',
  styleUrls: ['./add-tower-dialog.component.css']
})
export class AddTowerDialogComponent  {

  @Input() towers: Tower[];
  isExisting: boolean = false;
  errorMessage: string = "";
  errorRequiredMessage: string = "Tower name is required.";

  constructor(public activeModal: NgbActiveModal,
    private towerService: TowerService) { }


  onSubmitAddTower(form: NgForm) {
    if(this.towers.some(
        tower => tower.name === form.value.updateName
      )) {
      this.isExisting = true;
      this.errorMessage = "Tower name already exist.";
    }
    else {
      this.isExisting = false      
      this.towerService.addTower(form);
      this.activeModal.close();      
    }
  }

}
