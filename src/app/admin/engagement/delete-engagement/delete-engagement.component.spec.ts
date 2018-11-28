import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteEngagementComponent } from './delete-engagement.component';

describe('DeleteEngagementComponent', () => {
  let component: DeleteEngagementComponent;
  let fixture: ComponentFixture<DeleteEngagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteEngagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteEngagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
