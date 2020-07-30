import { Component, OnInit } from '@angular/core';

// JWT.
import * as jwt_decode from "jwt-decode"; // ESTO LO OBTENGO CON npm i jwt-decode


// ANGULAR FIRESTORE.
import { AngularFirestore } from '@angular/fire/firestore';

// GRIS
import {MatGridListModule} from '@angular/material/grid-list';

// TABLAS
import {MatTableModule} from '@angular/material/table';

// SERVICIO DATABASE.
import { DatabaseService } from "../../servicios/database.service"


// REGISTRO FORMBUILDER.
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-ver-mis-turnos-especialista',
  templateUrl: './ver-mis-turnos-especialista.component.html',
  styleUrls: ['./ver-mis-turnos-especialista.component.scss']
})

export class VerMisTurnosEspecialistaComponent implements OnInit {


    // USUARIO CARGADO.
    tokenUsuario;
    payloadUsuario;
    emailUsuario;

    // INTERNO
    nombreUsuario;
    DNIUsuario;
  

   listado = [];


  displayedColumns: string[] = ['nombre', 'codigo', 'fecha', 'horario', 'estado', 'accion'];


  // Mostrar reseña
  boolMostrarResenia = false;

  // Componentes para cargar completamente la reseña:

  reseniaFormGroup: FormGroup;
  reseniaTexto;


  constructor(private firestore : AngularFirestore,
    private dataBase : DatabaseService,
    private formBuilder: FormBuilder

    ) { 
          this.reseniaFormGroup = this.formBuilder.group({

          reseniaValidada: ['', [Validators.required, Validators.minLength(10)]],

          });
      }

  ngOnInit(): void {


        // USUARIO CARGADO.
        this.tokenUsuario = localStorage.getItem('token');
        this.payloadUsuario = jwt_decode(this.tokenUsuario);
        this.emailUsuario = this.payloadUsuario.email;


        this.boolMostrarResenia = false;
        this.listado = this.cargarTurnos();
        


  }


  cargarTurnos() 
  {

    var listaTurnosAux = [];

    this.firestore.collection("turnos").get().subscribe((querySnapShot) => {
      querySnapShot.forEach((doc) => {

        // Correo de la BD == Correo de la lista.
       if(doc.data().especialista.correo == this.emailUsuario && doc.data().estado != 'Finalizado')
       {
              listaTurnosAux.push(doc.data());  
       }

      })

    })

    return listaTurnosAux;
    
  }


  atenderPaciente(codigo, fecha, hora)

  {
    let auxTurnoPedido = null;
    this.firestore.collection("turnos").get().subscribe((querySnapShot) => {
      querySnapShot.forEach((doc) => {

        if(doc.data().codigo == codigo && doc.data().fechaJSON == fecha && doc.data().hora == hora)
        {
          console.log(doc.data());
          auxTurnoPedido = doc.data();
          auxTurnoPedido.estado = "Atendiendo";
          this.dataBase.actualizar("turnos", auxTurnoPedido, doc.id);

          setTimeout(() => {
            auxTurnoPedido = null;
            this.ngOnInit(); // Esto hace que me vuelva a cargar el listado, con los estados cambiados.
          }, 500);

        }
      })
    })
  }


  pacienteAtendido(codigo, fecha, hora)

  {
    let auxTurnoPedido = null;
    this.firestore.collection("turnos").get().subscribe((querySnapShot) => {
      querySnapShot.forEach((doc) => {

        if(doc.data().codigo == codigo)
        {
          if (doc.data().fechaJSON == fecha)
          {
            if (doc.data().hora == hora)
            {
                console.log(doc.data());
                auxTurnoPedido = doc.data();
                auxTurnoPedido.estado = "Atendido";
                this.dataBase.actualizar("turnos", auxTurnoPedido, doc.id);
            }
          }


          setTimeout(() => {
            auxTurnoPedido = null;
            this.ngOnInit(); // Esto hace que me vuelva a cargar el listado, con los estados cambiados.
          }, 500);

        }
      })
    })
  }





  desplegarCardResenia()
  {  
    this.reseniaTexto = "";
    this.boolMostrarResenia = true;
  }




  cargarResenia(codigo, fecha, hora)
  {
    let auxTurnoPedido = null;
    this.firestore.collection("turnos").get().subscribe((querySnapShot) => {
      querySnapShot.forEach((doc) => {

        if(doc.data().codigo == codigo)
        {
          if (doc.data().fechaJSON == fecha)
          {
            if (doc.data().hora == hora)
            {
              console.log(doc.data());

            
                auxTurnoPedido = doc.data();
                auxTurnoPedido.estado = "Finalizado";
                auxTurnoPedido.resenia = this.reseniaTexto;
                this.dataBase.actualizar("turnos", auxTurnoPedido, doc.id);

                setTimeout(() => {
                auxTurnoPedido = null;
                this.ngOnInit(); // Esto hace que me vuelva a cargar el listado, con los estados cambiados.
                }, 500);
              
            }

          }
        }
      })
    })
  }



}
