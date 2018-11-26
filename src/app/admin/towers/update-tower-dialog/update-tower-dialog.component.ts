import { Component, OnInit, Input } from '@angular/core';
import { TowerService } from 'src/app/services/tower.service';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Tower } from 'src/app/models/sprint.model';

@Component({
  selector: 'app-update-tower-dialog',
  templateUrl: './update-tower-dialog.component.html',
  styleUrls: ['./update-tower-dialog.component.css']
})
export class UpdateTowerDialogComponent  {
  @Input() towers: Tower[];
  @Input() updateTowerData: Tower;

  isExisting: boolean = false;
  errorMessage: string = "";
  errorRequiredMessage: string = "Tower name is required.";  

  constructor(public activeModal: NgbActiveModal,
    private towerService: TowerService) { }
    

  onSubmitUpdateTower(form: NgForm) {
    if(this.towers.some(
        tower => tower.name === form.value.updateName
      )) {
      this.isExisting = true;
      this.errorMessage = "Tower name already exist.";
    }
    else {
      this.isExisting = false
      this.towerService.updateTower(form);
      this.activeModal.close();
    }
  }

}
