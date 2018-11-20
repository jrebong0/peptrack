import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelEditorComponent } from './excel-editor.component';

describe('ExcelEditorComponent', () => {
  let component: ExcelEditorComponent;
  let fixture: ComponentFixture<ExcelEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcelEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcelEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
