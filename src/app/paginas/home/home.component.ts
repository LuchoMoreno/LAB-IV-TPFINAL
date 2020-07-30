import { Component, OnInit } from '@angular/core';

import { Router } from "@angular/router";

import * as jwt_decode from "jwt-decode"; // ESTO LO OBTENGO CON npm i jwt-decode

// FIRESTORE
import {AngularFirestore} from "@angular/fire/firestore";

// Servicio database.
import { DatabaseService } from '../../servicios/database.service'

// Servicio complementos.
import { ComplementosService } from '../../servicios/complementos.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  tokenUsuario;
  payloadUsuario;
  emailUsuario;

  nombreUsuario;
  apellidoUsuario;
  DNIUsuario;
  correoUsuario;
  tipoUsuario;
  fotoUsuario;
  especialidadUsuario;




  constructor(private firestore : AngularFirestore,
    private dataBase : DatabaseService,
    private complementos : ComplementosService) { }

  ngOnInit(): void {

    this.tokenUsuario = localStorage.getItem('token');
    this.payloadUsuario = jwt_decode(this.tokenUsuario);
    this.emailUsuario = this.payloadUsuario.email;





    this.buscarInfoLogueado();

  }



  
  buscarInfoLogueado(){

    this.firestore.collection('usuarios').get().subscribe((querySnapShot) => {
      querySnapShot.forEach((doc) => {

        // Correo de la BD == Correo de la lista.
       if(doc.data().correo == this.emailUsuario)
       {
        this.nombreUsuario = doc.data().nombre;
        this.apellidoUsuario = doc.data().apellido;
        this.DNIUsuario = doc.data().DNI;
        this.correoUsuario = doc.data().correo;
        this.tipoUsuario = doc.data().tipo;
        this.fotoUsuario = doc.data().foto;
        this.especialidadUsuario = doc.data().especialidad;
       }

      })
    })
    
  }

}
