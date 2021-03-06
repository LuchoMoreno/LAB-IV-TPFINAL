import { Component, OnInit } from '@angular/core';


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


// COMPLEMENTOS SERVICE
import { ComplementosService } from '../../servicios/complementos.service'



@Component({
  selector: 'app-alta-admin',
  templateUrl: './alta-admin.component.html',
  styleUrls: ['./alta-admin.component.scss']
})
export class AltaAdminComponent implements OnInit {


  private ocultaClave = true;

  public nombre;
  public apellido;
  public dni;
  public correo;
  public contrasenia;
  public repetirContrasenia;

  preimagen;

  registroLogin: FormGroup;


  usuarioJSON = {
    nombre : "",
    apellido: "",
    DNI: "",
    correo: "",
    contrasenia: "",
    repetirContrasenia: "",
    tipo: "",
    especialidad: "Ninguna",
    foto: "",
    ingreso: ""
  };



  constructor(private formBuilder: FormBuilder,

    private dataBase : DatabaseService,
    private authService : AuthService,
    
    private routerService : Router,
    
    private st : AngularFireStorage,

    private complementos : ComplementosService
    
    ) {

    this.registroLogin = this.formBuilder.group({

      nombreValidado: ['', [Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z]{4,20}$')]],

      apellidoValidado: ['', [Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z]{4,20}$')]],

      DNIValidado: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],

      correoValidado: ['', [Validators.required, Validators.email]],

      contraseniaValidada: ['', [Validators.required, Validators.minLength(6)]],

      repetirContraseniaValidada:['', [Validators.required, Validators.minLength(6)]],

   });
  
 }


  ngOnInit(): void {
  }


  handleImage(e: any):void{
    this.preimagen = e.target.files[0];  
  }


  public setOcultaClave(valor: boolean): void {
    this.ocultaClave = valor;
  }

  public getOcultaClave(): boolean {
    return this.ocultaClave;
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


        case 'contraseniaValidada':

            if (this.registroLogin.controls.correoValidado.hasError('required')) 
            {
              retorno = 'Debe ingresar una contraseña';
            } 
            
            if (this.registroLogin.controls.correoValidado.hasError('minLength')) 
            {
              retorno = 'Debe ingresar una contraseña mayor a 6 caracteres';
            }

        break;


        case 'repetirContraseniaValidada':

            if (this.registroLogin.controls.correoValidado.hasError('required')) 
            {
              retorno = 'Debe ingresar una contraseña';
            } 
            
            if (this.registroLogin.controls.correoValidado.hasError('minLength')) 
            {
              retorno = 'Debe ingresar una contraseña mayor a 6 caracteres';
            }

        break; 
    }

    return retorno;
  }


  registrarUsuarioBD()
  {

    this.usuarioJSON.ingreso = new Date().toLocaleString() // ASIGNA LA FECHA DE INGRESO A: AHORA MISMO.

    console.log(this.usuarioJSON);

    var storageRef = firebase.storage().ref();

    let referencia = `usuarios/${this.preimagen.name}`;
    

    var uploadTask = storageRef.child(referencia).put(this.preimagen).then(element => {

      console.log(this.preimagen.name);
      
      this.st.storage.ref(referencia).getDownloadURL().then((link) => {

        this.usuarioJSON.foto = link;

        this.complementos.snackBarMensaje("Creando usuario... por favor espere", "Aceptar");

        this.dataBase.crear('usuarios',this.usuarioJSON).then(resultado => {
        
        this.authService.register(this.usuarioJSON.correo,this.usuarioJSON.contrasenia).then (res => this.routerService.navigate(['/login']))
    
        .catch(err => alert("INCORRECTO"));;
        })
       
      })



    });


   

    /*

  registrarUsuarioBD()
  {
    console.log(this.usuarioJSON);


    var storageRef = firebase.storage().ref();

    let referencia = `usuarios/${this.preimagen.name}`;
    

    var uploadTask = storageRef.child(referencia).put(this.preimagen).then(element => {

      console.log(this.preimagen.name);
      
      this.st.storage.ref(referencia).getDownloadURL().then((link) => {

        this.usuarioJSON.foto = link;
        

       
        this.authService.register(this.usuarioJSON.correo,this.usuarioJSON.contrasenia)  
    
        .then (res => this.dataBase.crear('usuarios',this.usuarioJSON))
    
        .catch(err => alert("INCORRECTO"));


      })

    });

  }

  */


  }

}
