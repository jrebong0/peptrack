import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPerformanceReportComponent } from './add-performance-report.component';

describe('AddPerformanceReportComponent', () => {
  let component: AddPerformanceReportComponent;
  let fixture: ComponentFixture<AddPerformanceReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPerformanceReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPerformanceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
