import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Project } from 'src/app/models/project.model';
import { TowerService } from 'src/app/services/tower.service';
import { AddTowerDialogComponent } from '../admin/towers/add-tower-dialog/add-tower-dialog.component';
import { UpdateTowerDialogComponent } from '../admin/towers/update-tower-dialog/update-tower-dialog.component';


@Component({
  selector: 'app-towers',
  templateUrl: './towers.component.html',
  styleUrls: ['./towers.component.css'],
  providers: [ TowerService ]
})
export class TowersComponent implements OnInit {

  towers: Project[];
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

  update(towerUpdate: Project) {

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
