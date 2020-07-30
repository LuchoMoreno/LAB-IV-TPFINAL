import { Component, OnInit } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {FormControl} from '@angular/forms';

// JWT.
import * as jwt_decode from "jwt-decode"; // ESTO LO OBTENGO CON npm i jwt-decode



// DATEPIPE.
import { DatePipe } from '@angular/common';

// ANGULAR FIRESTORE.
import { AngularFirestore } from '@angular/fire/firestore';

// FIREBASE:
import * as firebase from 'firebase'

// FIREBASE STORAGE
import {AngularFireStorage} from "@angular/fire/storage"

// REGISTRO FORMBUILDER.
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// SERVICIO DATABASE.
import { DatabaseService } from "../../servicios/database.service"

// SERVICIO AUTH.
import { AuthService } from "../../servicios/auth.service"

// ROUTER
import { Router } from '@angular/router';

// SERVICIO COMPLEMENTOS.
import { ComplementosService } from "../../servicios/complementos.service"

@Component({
  selector: 'app-turno-telefo',
  templateUrl: './turno-telefo.component.html',
  styleUrls: ['./turno-telefo.component.scss']
})
export class TurnoTelefoComponent implements OnInit {





  public nombre;
  public apellido;
  public dni;


  registroLogin: FormGroup;
  listaHorariosHabiles

  turnoGenerado = {
    nombre : "",
    apellido: "",
    DNI: "",
    correoUsuario: "",
    fechaJSON: "",
    especialista: "",
    hora: "",
    codigo: "",
    estado: "enEspera",
    resenia: "", // esto despues se vuelve un json.
    encuesta: "", // esto despues se vuelve un json.
  };

  // CALENDARIO
  minDate: Date;
  maxDate: Date;
  fecha : Date;
  horaCargada;


  // ESPECIALISTAS.
  especialistaCargado;
  listaEspecialistas = [];

  // CONSULTORIOS.
  listaConsultorios = [];



  constructor(private formBuilder: FormBuilder,

    private dataBase : DatabaseService,

    private authService : AuthService,
    
    private routerService : Router,

    private firestore : AngularFirestore,

    private datePipe : DatePipe,

    private complementos : ComplementosService

  
    ) {

    this.registroLogin = this.formBuilder.group({

      nombreValidado: ['', [Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z]{4,20}$')]],

      apellidoValidado: ['', [Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z]{4,20}$')]],

      DNIValidado: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],

      fechaValidada : ['', [Validators.required]],

      correoValidado: ['', [Validators.required, Validators.email]],

      especialistaValidado : ['', [Validators.required]],

   });
  
 }


  ngOnInit(): void {

    this.minDate = new Date();
    this.maxDate = new Date(2050,1,30);

    this.listaEspecialistas = this.cargarUsuariosEspecialistas("Especialista");

  }


  public mostrarErrorRegistro(control: string): string {

    let retorno = '';

    switch (control) {

      case 'nombreValidado':

            if (this.registroLogin.controls.nombreValidado.hasError('required')) 
            {
              retorno = 'Debe ingresar un nombre.';
            } 
            
            if (this.registroLogin.controls.nombreValidado.hasError('minLength')) 
            {
              retorno = 'Debe ingresar un nombre válido.';
            }
            
            if (this.registroLogin.controls.nombreValidado.hasError('pattern')) 
            {
              retorno = 'Error con el formato del nombre.';
            }

        break;
    
        case 'apellidoValidado':

            if (this.registroLogin.controls.apellidoValidado.hasError('required')) 
            {
              retorno = 'Debe ingresar un apellido.';
            } 
            
            if (this.registroLogin.controls.apellidoValidado.hasError('minLength')) 
            {
              retorno = 'Debe ingresar un apellido válido.';
            }
            
            if (this.registroLogin.controls.apellidoValidado.hasError('pattern')) 
            {
              retorno = 'Error con el formato del apellido.';
            }
  
        break;


        case 'correoValidado':

            if (this.registroLogin.controls.correoValidado.hasError('required')) 
            {
              retorno = 'Debe ingresar un email.';
            } 
            
            if (this.registroLogin.controls.correoValidado.hasError('email')) 
            {
              retorno = 'Debe ingresar un email válido.';
            }

        break;



        case 'DNIValidado':

            if (this.registroLogin.controls.DNIValidado.hasError('required')) 
            {
              retorno = 'Debe ingresar un DNI.';
            } 
            
            if (this.registroLogin.controls.DNIValidado.hasError('pattern')) 
            {
              retorno = 'Error con el formato del DNI.';
            }
            
        break;
          }
          


    return retorno;
  }



  filtrarFecha = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
   return day !== 0;
  }


  cargarUsuariosEspecialistas(tipoUsuario : string) : any
  {

    var listaUsuarios = [];
    this.firestore.collection("usuarios").get().subscribe((querySnapShot) => {
      querySnapShot.forEach((doc) => {

        // Correo de la BD == Correo de la lista.
       if(doc.data().tipo == tipoUsuario)
       {
        listaUsuarios.push(doc.data());  
       }

      })
    })

    return listaUsuarios;
  }


  consultorioAleatorio (): string
  {

    this.listaConsultorios = ['aaCON01','bbCON02','ccCON03','ddCON04','eeCON05','ffCON06','ggCON07','hhLAB01','iiLAB02'];

    let aleatorio = Math.floor(Math.random()*(this.listaConsultorios.length));
    let seleccion = this.listaConsultorios[aleatorio];

    return seleccion
  }


  generarTurno()
  {
    // Colocar en un servicio y en una interface
    let fecha = this.datePipe.transform(this.fecha, 'yyyy-MM-dd');


    this.turnoGenerado.fechaJSON = fecha;
    this.turnoGenerado.especialista = this.especialistaCargado;
    this.turnoGenerado.hora = this.horaCargada;

    this.turnoGenerado.codigo = this.consultorioAleatorio();


    this.dataBase.crear('turnos',this.turnoGenerado).then( r => {
      this.complementos.snackBarMensaje(`El codigo de su turno es : ${this.turnoGenerado.codigo}`, "Aceptar");
      this.limpiarCampos();
    }).catch( e => { 
      alert("Error al generar turno " + e);
    })
    
  }



  limpiarCampos()
  {
    this.turnoGenerado.correoUsuario = null; 
    this.turnoGenerado.nombre = null; 
    this.turnoGenerado.apellido = null; 
    this.turnoGenerado.DNI = null; 
    this.fecha = null;
    this.especialistaCargado = null; 
    this.horaCargada = null;

    this.turnoGenerado.fechaJSON = null;
    this.turnoGenerado.especialista = null;
    this.turnoGenerado.hora = null;
    this.turnoGenerado.codigo = null;
  
  }



// IMPORTANTE.
  cargarHorario(e)  
   {     
    this.horaCargada = e;   
  }



  buscarCorreoExistente() 
  {
    this.firestore.collection("usuarios").get().subscribe((querySnapShot) => { querySnapShot.forEach((doc) => {

       if(doc.data().correo == this.turnoGenerado.correoUsuario && doc.data().tipo != "Cliente")
       {
        this.complementos.snackBarMensaje("El correo existe. Pero NO corresponde a un cliente", "Aceptar");
       }

       else if(doc.data().correo == this.turnoGenerado.correoUsuario && doc.data().tipo == "Cliente")
       {
        this.complementos.snackBarMensaje("El correo existe. El turno puede ser generado", "Aceptar");
       }

      })

    })

  }



}