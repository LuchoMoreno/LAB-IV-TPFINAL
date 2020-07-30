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


// SERVICIO DATABASE.
import { DatabaseService } from "../../servicios/database.service"


// REGISTRO FORMBUILDER.
import { FormBuilder, FormGroup, Validators } from '@angular/forms';




@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss']
})
export class EncuestaComponent implements OnInit {


    // USUARIO CARGADO.
    tokenUsuario;
    payloadUsuario;
    emailUsuario;

    // INTERNO
    nombreUsuario;
    DNIUsuario;
  


  listado = [];


  displayedColumns: string[] = ['nombre', 'codigo', 'fecha', 'horario', 'estado', 'especialista', 'accion'];



    // Mostrar encuesta
    boolMostrarEncuesta = false;

    // Componentes encuesta.
    encuestaFormGroup: FormGroup;

    // Encuesta JSON.
    encuestaGeneradaJSON = {
      satisfaccionClinica: "",
      satisfaccionEspecialista: "",
      encuestaTexto: "",
    };



  constructor(private firestore : AngularFirestore,
    private complementos : ComplementosService,
    private formBuilder: FormBuilder,
    
    private dataBase : DatabaseService)
      {

          this.encuestaFormGroup = this.formBuilder.group({

          encuestaValidada: ['', [Validators.required, Validators.minLength(10)]],

          encuestaClinicaValidada : ['', Validators.required],

          encuestaEspecialistaValidada : ['', Validators.required],

          });


      }

  ngOnInit(): void {


        // USUARIO CARGADO.
        this.tokenUsuario = localStorage.getItem('token');
        this.payloadUsuario = jwt_decode(this.tokenUsuario);
        this.emailUsuario = this.payloadUsuario.email;

        this.boolMostrarEncuesta = false;
        this.listado = this.cargarTurnos();
        

  }


  cargarTurnos() 
  {

    var listaTurnosAux = [];

    this.firestore.collection("turnos").get().subscribe((querySnapShot) => {
      querySnapShot.forEach((doc) => {

        // Correo de la BD == Correo de la lista.
       if(doc.data().correoUsuario == this.emailUsuario && doc.data().estado == 'Finalizado')
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


  desplegarCardEncuesta()
  {  
    this.encuestaGeneradaJSON.satisfaccionClinica = "";
    this.encuestaGeneradaJSON.satisfaccionEspecialista = "";
    this.encuestaGeneradaJSON.encuestaTexto = "";
    this.boolMostrarEncuesta= true;
  }




  cargarEncuesta(codigo, fecha, hora)
  {
    let auxTurno = null;
    this.firestore.collection("turnos").get().subscribe((querySnapShot) => {
      querySnapShot.forEach((doc) => {

        if(doc.data().codigo == codigo)
        {
          if (doc.data().fechaJSON == fecha)
          {
            if (doc.data().hora == hora)
            {
              console.log(doc.data());

                auxTurno = doc.data();
                auxTurno.estado = "FinalizadoConEncuesta";
                auxTurno.encuesta = this.encuestaGeneradaJSON;
                this.dataBase.actualizar("turnos", auxTurno, doc.id);

                setTimeout(() => {
                  auxTurno = null;
                  this.ngOnInit(); // Esto hace que me vuelva a cargar el listado, con los estados cambiados.
                }, 500);
              
            }

          }
        }
      })
    })
  }


}
