import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityGroupDeleteComponent } from './security-group-delete.component';

describe('SecurityGroupDeleteComponent', () => {
  let component: SecurityGroupDeleteComponent;
  let fixture: ComponentFixture<SecurityGroupDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityGroupDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityGroupDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
