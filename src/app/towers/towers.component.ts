import { Component, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('updateTowerForm') towerForm: NgForm;
  tower: Tower;
  towers: Tower[];

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
      key: form.value.key,
      name: form.value.updateName,
      dateCreated: Date(),
      createdBy: localStorage.getItem('currentUser'),
      type: 'admin'
    };
    this.towerService.updateTower(this.tower);
    this.modalService.dismissAll();
  }

  open(modal) {
    this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'});
  }

  fillUpdateForm(content: any, towerUpdate: Tower) {
    // console.log('content', content, this.towerForm.form);

    this.open(content);
    setTimeout(() => {
      console.log(this.towerForm.form);
     }, 5000);
    // this.towerForm.controls['updateName'].setValue(towerUpdate.name);
  }
}
