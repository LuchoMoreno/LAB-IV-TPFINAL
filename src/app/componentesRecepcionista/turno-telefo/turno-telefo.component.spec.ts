import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoTelefoComponent } from './turno-telefo.component';

describe('TurnoTelefoComponent', () => {
  let component: TurnoTelefoComponent;
  let fixture: ComponentFixture<TurnoTelefoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnoTelefoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnoTelefoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
