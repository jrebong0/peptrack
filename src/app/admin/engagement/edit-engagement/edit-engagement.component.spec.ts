import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEngagementComponent } from './edit-engagement.component';

describe('EditEngagementComponent', () => {
  let component: EditEngagementComponent;
  let fixture: ComponentFixture<EditEngagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEngagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEngagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
