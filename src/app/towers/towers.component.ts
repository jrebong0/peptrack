import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { Tower } from '../models/tower.model';
import { TowerService } from '../services/tower.service';

@Component({
  selector: 'app-towers',
  templateUrl: './towers.component.html',
  styleUrls: ['./towers.component.css'],
  providers: [TowerService]
})
export class TowersComponent implements OnInit {
  tower: Tower;
  updateTowerData: Tower;
  towers: Tower[];

  constructor(private modalService: NgbModal,
    private towerService: TowerService) { }

  ngOnInit() {
    this.towerService.getTowerList().subscribe(
      (towerList: any) => {
        this.towers = towerList.sort(
          (first, second) => {
            console.log("DISPLAY: ", first, second);
            return new Date(first.dateCreated) < new Date(second.dateCreated) ?
              first : second;
          }
        );
      }
    );
  }

  onSubmitAddTower(form: NgForm) {
    this.tower = {
      name: form.value.towerName,
      dateCreated: Date(),
      createdBy: localStorage.getItem('currentUser'),
      type: 'admin'
    };
    this.towerService.addTower(this.tower);
    this.modalService.dismissAll();
  }

  onSubmitUpdateTower(form: NgForm) {
    this.tower = {
      name: form.value.updateName,
      dateCreated: Date(),
      createdBy: localStorage.getItem('currentUser'),
      type: 'admin'
    };
    this.towerService.updateTower(this.tower, form.value.key);
    this.modalService.dismissAll();
  }

  open(modal) {
    this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'});
  }

  fillUpdateForm(content: any, towerUpdate: Tower) {
    this.open(content);
    this.updateTowerData = towerUpdate;
  }
}
