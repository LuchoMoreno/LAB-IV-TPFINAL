import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerMisTurnosEspecialistaComponent } from './ver-mis-turnos-especialista.component';

describe('VerMisTurnosEspecialistaComponent', () => {
  let component: VerMisTurnosEspecialistaComponent;
  let fixture: ComponentFixture<VerMisTurnosEspecialistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerMisTurnosEspecialistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerMisTurnosEspecialistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
