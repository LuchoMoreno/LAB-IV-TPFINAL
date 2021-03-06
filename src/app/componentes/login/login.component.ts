import { Component, OnInit } from '@angular/core';


// LOGIN FORMBUILDER.
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// SERVICIO DATABASE.
import { DatabaseService } from "../../servicios/database.service"

// SERVICIO AUTH.
import { AuthService } from "../../servicios/auth.service"

// ROUTER
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  
  private ocultaClave = true;
  public correo;
  public clave;

  formularioLogin: FormGroup;




  constructor(private formBuilder: FormBuilder,
    
    private dataBase : DatabaseService,
    private authService : AuthService,
    
    private routerService : Router) {

      this.formularioLogin = this.formBuilder.group({
        claveValidada: ['', [Validators.required, Validators.minLength(6)]],
        correoValidado: ['', [Validators.required, Validators.email] ],
     });
    
   }


  ngOnInit(): void {
   
  }


  public setOcultaClave(valor: boolean): void {
    this.ocultaClave = valor;
  }

  public getOcultaClave(): boolean {
    return this.ocultaClave;
  }



  public mostrarError(control: string): string {

    let retorno = '';

    switch (control) {

      case 'correoValidado':
        if (this.formularioLogin.controls.correoValidado.hasError('required')) 
        {
          retorno = 'Debe ingresar un correo electrónico.';
        } 
        
        else if (this.formularioLogin.controls.correoValidado.hasError('email')) 
        {
          retorno = 'Debe ingresar un correo electrónico válido.';
        }
        
        else 
        {
          retorno = 'Error con el correo.';
        }

        break;
    
      case 'claveValidada':
        if (this.formularioLogin.controls.claveValidada.hasError('required')) 
        {
          retorno = 'Debe ingresar una clave';
        } 
        
        else if (this.formularioLogin.controls.claveValidada.hasError('minlength')) 
        {
          retorno = 'La clave ingresada debe contener al menos 6 caracteres';
        } 

        break;
    }

    return retorno;
  }


  
  onSubmitLogin()
  {
  
  this.authService.login(this.correo, this.clave)
  
  .then (res => this.routerService.navigate(['/home']))
  
  .catch(err => alert("Los datos son incorrectos. No existe tal usuario"));

  }



  irRegistrarse()
  {
    this.routerService.navigate(['/registro']);
  }



}

