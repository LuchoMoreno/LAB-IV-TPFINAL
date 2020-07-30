import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-recepcionista',
  templateUrl: './home-recepcionista.component.html',
  styleUrls: ['./home-recepcionista.component.scss']
})
export class HomeRecepcionistaComponent implements OnInit {


  boolMostrarTurnoTelefo = false;
  boolMostrarCancelarTurnos = false;

  constructor() { }

  ngOnInit(): void {
    this.boolMostrarTurnoTelefo = false;
    this.boolMostrarCancelarTurnos = false;

  }


  mostrarTurnoTelefono()
  {
    this.boolMostrarTurnoTelefo = true;
    this.boolMostrarCancelarTurnos = false;
  }


  mostrarCancelarTurno()
  {
    this.boolMostrarTurnoTelefo = false;
    this.boolMostrarCancelarTurnos = true;
  }

}
