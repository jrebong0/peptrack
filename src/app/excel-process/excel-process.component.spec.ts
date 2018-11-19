import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelProcessComponent } from './excel-process.component';

describe('ExcelProcessComponent', () => {
  let component: ExcelProcessComponent;
  let fixture: ComponentFixture<ExcelProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcelProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcelProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
