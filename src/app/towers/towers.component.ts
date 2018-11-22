import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { Tower } from '../models/tower.model';
import { TowerService } from '../services/tower.service';

@Component({
  selector: 'app-towers',
  templateUrl: './towers.component.html',
  styleUrls: ['./towers.component.css'],
  providers: [ TowerService ]
})
export class TowersComponent implements OnInit {
  updateTowerData: Tower;
  towers: Tower[];
  isExisting: boolean = false;
  errorMessage: string = "";
  errorRequiredMessage: string = "Tower name is requried.";
  activeModal: NgbModalRef;

  constructor(private modalService: NgbModal,
    private towerService: TowerService) { }

  ngOnInit() {
    this.towerService.getTowerList().subscribe(
      (towerList: any) => {
        this.towers = towerList;
      }
    );
  }

  onSubmitAddTower(form: NgForm) {
    if(this.towers.some(
        tower => tower.name === form.value.towerName
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

  open(modal) {
    this.activeModal = this.modalService.open(modal, {
      ariaLabelledBy: 'modal-basic-title'
    });
  }

  fillUpdateForm(content: any, towerUpdate: Tower) {
    this.open(content);
    this.updateTowerData = Object.assign({}, towerUpdate);
  }
}
