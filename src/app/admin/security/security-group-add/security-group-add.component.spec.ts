import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityGroupAddComponent } from './security-group-add.component';

describe('SecurityGroupAddComponent', () => {
  let component: SecurityGroupAddComponent;
  let fixture: ComponentFixture<SecurityGroupAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityGroupAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityGroupAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
