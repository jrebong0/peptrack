import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTowerDialogComponent } from './update-tower-dialog.component';

describe('UpdateTowerDialogComponent', () => {
  let component: UpdateTowerDialogComponent;
  let fixture: ComponentFixture<UpdateTowerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTowerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTowerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
