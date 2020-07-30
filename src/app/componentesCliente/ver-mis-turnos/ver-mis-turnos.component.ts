import { Component, OnInit } from '@angular/core';

// JWT.
import * as jwt_decode from "jwt-decode"; // ESTO LO OBTENGO CON npm i jwt-decode


// ANGULAR FIRESTORE.
import { AngularFirestore } from '@angular/fire/firestore';

// GRIS
import {MatGridListModule} from '@angular/material/grid-list';

// TABLAS
import {MatTableModule} from '@angular/material/table';

// Importo el servicio de complementos.
import { ComplementosService } from '../../servicios/complementos.service'


@Component({
  selector: 'app-ver-mis-turnos',
  templateUrl: './ver-mis-turnos.component.html',
  styleUrls: ['./ver-mis-turnos.component.scss']
})
export class VerMisTurnosComponent implements OnInit {


    // USUARIO CARGADO.
    tokenUsuario;
    payloadUsuario;
    emailUsuario;

    // INTERNO
    nombreUsuario;
    DNIUsuario;
  


  listado = [];


  displayedColumns: string[] = ['nombre', 'codigo', 'fecha', 'horario', 'estado', 'especialista', 'accion'];


  constructor(private firestore : AngularFirestore,
    private complementos : ComplementosService) {  }

  ngOnInit(): void {


        // USUARIO CARGADO.
        this.tokenUsuario = localStorage.getItem('token');
        this.payloadUsuario = jwt_decode(this.tokenUsuario);
        this.emailUsuario = this.payloadUsuario.email;


        this.listado = this.cargarTurnos();
        

/*
        let fb = this.firestore.collection('turnos');
              
        fb.valueChanges().subscribe(datos =>{      
      
         datos.forEach( (dato:any) =>{

           if(dato.correoUsuario == this.emailUsuario) 
              {
                this.listado.push(dato);      // <--- LISTA DE USUARIOS.
              }
            });

    })
*/ 

  }


  cargarTurnos() 
  {

    var listaTurnosAux = [];

    this.firestore.collection("turnos").get().subscribe((querySnapShot) => {
      querySnapShot.forEach((doc) => {

        // Correo de la BD == Correo de la lista.
       if(doc.data().correoUsuario == this.emailUsuario)
       {
              listaTurnosAux.push(doc.data());  
       }

      })

    })

    return listaTurnosAux;
    
  }


  verMiReseniaDada(resenia : string)
  {
    this.complementos.snackBarMensaje(resenia, "Aceptar");
  }


  prueba()
  {
    console.log("prueba");
  }


}
