import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


// IMPORT ENVIROMENT 
import { firebaseConfig } from "../environments/environment";

// IMPORT FIRE MODULE.
import {AngularFireModule} from "@angular/fire";

// IMPORT LOGIN.
import {AngularFireAuthModule} from "@angular/fire/auth";
import { LoginComponent } from './componentes/login/login.component';
import { BienvenidoComponent } from './paginas/bienvenido/bienvenido.component';


// PRUEBA:
import { MatSliderModule } from '@angular/material/slider';


// CARDS -> Para login.
import {MatCardModule} from '@angular/material/card';


// FORMBUILDER
import { ReactiveFormsModule } from '@angular/forms';


// BUTTON
import {MatButtonModule} from '@angular/material/button';


// SNACKBAR -> PARA MENSAJES.
import {MatSnackBarModule} from '@angular/material/snack-bar';


// SELECTORS -> Para seleccionar usuario.
import {MatSelectModule} from '@angular/material/select';


// FECHAS -> Para turnos.
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';


// DATEPIPE
import { DatePipe } from '@angular/common';


// PARA HACER LOS SORTS.
import { MatSortModule } from '@angular/material/sort';


// Para hacer los dialogs.
import {MatDialogModule} from '@angular/material/dialog';


// Para hacer las estadisticas.
import { ChartsModule } from 'ng2-charts';




// ANGULAR MATERIAL:
//Angular Material Components
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { RegistroComponent } from './componentes/registro/registro.component';
import { ToolbarPrincipalComponent } from './componentes/toolbar-principal/toolbar-principal.component';
import { HomeComponent } from './paginas/home/home.component';
import { LogoutComponent } from './componentes/logout/logout.component';
import { HomeAdministradorComponent } from './paginas/home-administrador/home-administrador.component';
import { HomeClienteComponent } from './paginas/home-cliente/home-cliente.component';
import { HomeRecepcionistaComponent } from './paginas/home-recepcionista/home-recepcionista.component';
import { HomeEspecialistaComponent } from './paginas/home-especialista/home-especialista.component';
import { AltaAdminComponent } from './componentesAdmin/alta-admin/alta-admin.component';
import { EmpleadosAdminComponent } from './componentesAdmin/empleados-admin/empleados-admin.component';
import { SolicitarTurnoComponent } from './componentesCliente/solicitar-turno/solicitar-turno.component';
import { VerMisTurnosComponent } from './componentesCliente/ver-mis-turnos/ver-mis-turnos.component';
import { EncuestaComponent } from './componentesCliente/encuesta/encuesta.component';
import { HorariosComponent } from './componentesCliente/horarios/horarios.component';
import { TurnoTelefoComponent } from './componentesRecepcionista/turno-telefo/turno-telefo.component';
import { CancelarTurnoComponent } from './componentesRecepcionista/cancelar-turno/cancelar-turno.component';
import { VerMisTurnosEspecialistaComponent } from './componentesEspecialista/ver-mis-turnos-especialista/ver-mis-turnos-especialista.component';
import { TurnosPorEspecialidadComponent } from './componentesAdmin/turnos-por-especialidad/turnos-por-especialidad.component';
import { TurnosRealizadosComponent } from './componentesAdmin/turnos-realizados/turnos-realizados.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BienvenidoComponent,
    RegistroComponent,
    ToolbarPrincipalComponent,
    HomeComponent,
    LogoutComponent,
    HomeAdministradorComponent,
    HomeClienteComponent,
    HomeRecepcionistaComponent,
    HomeEspecialistaComponent,
    AltaAdminComponent,
    EmpleadosAdminComponent,
    SolicitarTurnoComponent,
    VerMisTurnosComponent,
    EncuestaComponent,
    HorariosComponent,
    TurnoTelefoComponent,
    CancelarTurnoComponent,
    VerMisTurnosEspecialistaComponent,
    TurnosPorEspecialidadComponent,
    TurnosRealizadosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    
    AngularFireModule.initializeApp(firebaseConfig), AngularFireAuthModule,

    ReactiveFormsModule,

    ChartsModule,

    MatSliderModule,
    MatCardModule,
    MatButtonModule,
    MatNativeDateModule,

    MatSortModule,

    BrowserAnimationsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
