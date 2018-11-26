import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TowerService } from 'src/app/services/tower.service';
import { AddTowerDialogComponent } from './add-tower-dialog/add-tower-dialog.component';
import { UpdateTowerDialogComponent } from './update-tower-dialog/update-tower-dialog.component';
import { Tower } from 'src/app/models/sprint.model';


@Component({
  selector: 'app-towers',
  templateUrl: './towers.component.html',
  styleUrls: ['./towers.component.css'],
  providers: [ TowerService ]
})
export class TowersComponent implements OnInit {

  towers: Tower[];
  activeModal: NgbModalRef;

  constructor(private modalService: NgbModal,
    private towerService: TowerService) { }

  ngOnInit() {
    this.getTowerList();
  }

  getTowerList() {
    this.towerService.getTowerList().subscribe(
      (towerList: any) => {
        this.towers = towerList;
      }
    );
  }

  open() {

    this.activeModal = this.modalService.open(AddTowerDialogComponent, {
      ariaLabelledBy: 'modal-basic-title'
    });
      
    this.activeModal.componentInstance.towers = this.towers;

    this.activeModal.result.then(result => {
      this.getTowerList();
    }, reason =>{
      console.log(reason);      
    });
  }

  update(towerUpdate: Tower) {

    this.activeModal = this.modalService.open(UpdateTowerDialogComponent, {
      ariaLabelledBy: 'modal-basic-title'
    });
    
    this.activeModal.componentInstance.towers = this.towers;
    this.activeModal.componentInstance.updateTowerData = Object.assign({}, towerUpdate);

    this.activeModal.result.then(result => {
      this.getTowerList();
    }, reason =>{
      console.log(reason);      
    })

     
  }
}
