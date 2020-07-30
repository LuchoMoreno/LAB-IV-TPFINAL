import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-cliente',
  templateUrl: './home-cliente.component.html',
  styleUrls: ['./home-cliente.component.scss']
})
export class HomeClienteComponent implements OnInit {

boolMostrarSolicitarTurno = false;
boolMostrarVerMisTurnos = false;
boolMostrarEncuesta = false;

  constructor() { }

  ngOnInit(): void {

    

    this.boolMostrarSolicitarTurno = false;
    this.boolMostrarVerMisTurnos = false;
    this.boolMostrarEncuesta = false;
  }


  mostrarSolicitarTurno()
  {
    this.boolMostrarSolicitarTurno = true;
    this.boolMostrarVerMisTurnos = false;
    this.boolMostrarEncuesta = false;
  }


  mostrarVerTurnosPedidos()
  {
    this.boolMostrarSolicitarTurno = false;
    this.boolMostrarVerMisTurnos = true;
    this.boolMostrarEncuesta = false;
  }

  mostrarEncuesta()
  {
    this.boolMostrarSolicitarTurno = false;
    this.boolMostrarVerMisTurnos = false;
    this.boolMostrarEncuesta = true;
  }

}
