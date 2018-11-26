import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TardinessComponent } from './tardiness.component';

describe('TardinessComponent', () => {
  let component: TardinessComponent;
  let fixture: ComponentFixture<TardinessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TardinessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TardinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
