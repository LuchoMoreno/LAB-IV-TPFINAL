import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-administrador',
  templateUrl: './home-administrador.component.html',
  styleUrls: ['./home-administrador.component.scss']
})
export class HomeAdministradorComponent implements OnInit {


  boolMostrarGenerarAlta = false;
  boolMostrarEmpleadosAdmin = false;
  boolMostrarTurnosRealizados = false;
  boolMostrarTurnosPorEspecialidad = false;

  constructor() { }

  ngOnInit(): void {
    this.boolMostrarGenerarAlta = false;
    this.boolMostrarEmpleadosAdmin = false;
    this.boolMostrarTurnosRealizados = false;
    this.boolMostrarTurnosPorEspecialidad = false;
  }


  mostrarGenerarAlta()
  {
    this.boolMostrarGenerarAlta = true;
    this.boolMostrarEmpleadosAdmin = false;
    this.boolMostrarTurnosRealizados = false;
    this.boolMostrarTurnosPorEspecialidad = false;
  }


  mostrarEmpleadosAdmin()
  {
    this.boolMostrarGenerarAlta = false;
    this.boolMostrarEmpleadosAdmin = true;
    this.boolMostrarTurnosRealizados = false;
    this.boolMostrarTurnosPorEspecialidad = false;
  }



  mostrarTurnosRealizados()
  {
    this.boolMostrarGenerarAlta = false;
    this.boolMostrarEmpleadosAdmin = false;
    this.boolMostrarTurnosRealizados = true;
    this.boolMostrarTurnosPorEspecialidad = false;
    
  }



  mostrarTurnosPorEspecialidad()
  {
    this.boolMostrarGenerarAlta = false;
    this.boolMostrarEmpleadosAdmin = false;
    this.boolMostrarTurnosRealizados = false;
    this.boolMostrarTurnosPorEspecialidad = true;
    
  }

}
