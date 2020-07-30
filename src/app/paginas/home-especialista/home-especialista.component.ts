import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-especialista',
  templateUrl: './home-especialista.component.html',
  styleUrls: ['./home-especialista.component.scss']
})
export class HomeEspecialistaComponent implements OnInit {

  boolMostrarMisTurnosEspecialista = false;
  boolMostrar = false;

  
    constructor() { }
  
    ngOnInit(): void {
  
      this.boolMostrarMisTurnosEspecialista = false;
      this.boolMostrar = false;
    }
  
  
    mostrarMisTurnosEspecialista()
    {
      this.boolMostrarMisTurnosEspecialista = true;
      this.boolMostrar = false;
    }



    mostrarOtro()
    {
      this.boolMostrarMisTurnosEspecialista = false;
      this.boolMostrar = true;
    }
  


  
  
  }
  