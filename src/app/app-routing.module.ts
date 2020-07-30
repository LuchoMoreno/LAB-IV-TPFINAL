import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


// PAGINAS.
import { BienvenidoComponent } from './paginas/bienvenido/bienvenido.component';

import { HomeComponent } from './paginas/home/home.component';


// COMPONENTES.

import { LoginComponent } from './componentes/login/login.component';

import { RegistroComponent } from './componentes/registro/registro.component';

import { ToolbarPrincipalComponent } from './componentes/toolbar-principal/toolbar-principal.component';

import { LogoutComponent } from './componentes/logout/logout.component';

// GUARD.
import { AuthGuard } from '../app/guards/auth.guard';
import { HomeAdministradorComponent } from './paginas/home-administrador/home-administrador.component';
import { HomeEspecialistaComponent } from './paginas/home-especialista/home-especialista.component';
import { HomeClienteComponent } from './paginas/home-cliente/home-cliente.component';
import { HomeRecepcionistaComponent } from './paginas/home-recepcionista/home-recepcionista.component';





const routes: Routes = [


  {
    path: 'bienvenido', 
    component: BienvenidoComponent,
  },

  { path: '', pathMatch: 'full', redirectTo: 'bienvenido'},

  {
    path: 'login', component: LoginComponent 
  },

  {
    path: 'registro', component: RegistroComponent 
  },

  {
    path: 'toolbar', 
    component: ToolbarPrincipalComponent,
  },

  {
    path: 'home', 
    component: HomeComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'homeAdmin', 
    component: HomeAdministradorComponent,
  },


  {
    path: 'homeCliente', 
    component: HomeClienteComponent,
  },


  {
    path: 'homeEspecialista', 
    component: HomeEspecialistaComponent,
  },


  {
    path: 'homeRecepcionista', 
    component: HomeRecepcionistaComponent,
  },


  {
    path: 'logout', 
    component: LogoutComponent,
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
