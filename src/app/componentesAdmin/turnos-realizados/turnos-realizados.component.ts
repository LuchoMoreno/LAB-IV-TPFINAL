import { Component, OnInit } from '@angular/core';

// JWT.
import * as jwt_decode from "jwt-decode"; // ESTO LO OBTENGO CON npm i jwt-decode


// ANGULAR FIRESTORE.
import { AngularFirestore } from '@angular/fire/firestore';

// GRIS
import {MatGridListModule} from '@angular/material/grid-list';

// TABLAS
import {MatTableModule} from '@angular/material/table';

// SERVICIO COMPLEMENTOS.
import {ComplementosService} from "../../servicios/complementos.service"

@Component({
  selector: 'app-turnos-realizados',
  templateUrl: './turnos-realizados.component.html',
  styleUrls: ['./turnos-realizados.component.scss']
})
export class TurnosRealizadosComponent implements OnInit {


  listado = [];
  displayedColumns: string[] = ['nombre', 'codigo', 'fecha', 'horario', 'especialista', 'especialidad', 'estado'];


  constructor(private firestore : AngularFirestore,
    private complementos : ComplementosService ) {  }

  ngOnInit(): void {

        this.listado = this.cargarTurnos();
        
  }


  cargarTurnos() 
  {

    var listaTurnosAux = [];

    this.firestore.collection("turnos").get().subscribe((querySnapShot) => {
      querySnapShot.forEach((doc) => {

      listaTurnosAux.push(doc.data());  
        

      })
    })

    return listaTurnosAux;
    
  }




  cancelarTurno(codigo, fecha)
  {
    let auxDoc ;

    this.firestore.collection("turnos").get().subscribe((querySnapShot) => {
      querySnapShot.forEach((doc) => {

        if(doc.data().codigo == codigo && doc.data().fechaJSON == fecha)
        {
          this.firestore.collection('turnos').doc(doc.id).delete();
          this.complementos.snackBarMensaje("Turno eliminado con éxito", "Aceptar")


          setTimeout(() => {
            this.ngOnInit(); // Esto hace que me vuelva a cargar el listado, con los estados cambiados.
          }, 200);
        
        }

      })
    })

        
  }

}