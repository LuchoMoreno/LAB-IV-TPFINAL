import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosRealizadosComponent } from './turnos-realizados.component';

describe('TurnosRealizadosComponent', () => {
  let component: TurnosRealizadosComponent;
  let fixture: ComponentFixture<TurnosRealizadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnosRealizadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnosRealizadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
