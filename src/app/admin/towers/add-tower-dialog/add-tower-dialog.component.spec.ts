import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTowerDialogComponent } from './add-tower-dialog.component';

describe('AddTowerDialogComponent', () => {
  let component: AddTowerDialogComponent;
  let fixture: ComponentFixture<AddTowerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTowerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTowerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
