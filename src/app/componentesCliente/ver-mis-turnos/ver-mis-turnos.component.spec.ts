import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerMisTurnosComponent } from './ver-mis-turnos.component';

describe('VerMisTurnosComponent', () => {
  let component: VerMisTurnosComponent;
  let fixture: ComponentFixture<VerMisTurnosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerMisTurnosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerMisTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
