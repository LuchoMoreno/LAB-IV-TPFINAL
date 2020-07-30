import { Component, OnInit } from '@angular/core';
import { SingleDataSet, Label } from 'ng2-charts';
import { ChartType } from 'chart.js';


// ANGULAR FIRESTORE.
import { AngularFirestore } from '@angular/fire/firestore';


// SERVICIO COMPLEMENTOS.
import {ComplementosService} from "../../servicios/complementos.service"

@Component({
  selector: 'app-turnos-por-especialidad',
  templateUrl: './turnos-por-especialidad.component.html',
  styleUrls: ['./turnos-por-especialidad.component.scss']
})
export class TurnosPorEspecialidadComponent implements OnInit {


public polarAreaChartLabels: Label[] = ['Endodoncia', 'Periodoncia', 'Ortodoncia', 'General'];
public polarAreaChartData: SingleDataSet = [0,0,0,0];
public polarAreaLegend = true;

public polarAreaChartType: ChartType = 'polarArea';



contadorEndodoncia;
contadorPeriodoncia;
contadorOrtodoncia;
contadorGeneral;

constructor(private firestore : AngularFirestore,
private complementos : ComplementosService) { }

ngOnInit() {


  this.contadorEndodoncia = 0;
  this.contadorPeriodoncia = 0;
  this.contadorOrtodoncia = 0;
  this.contadorGeneral = 0;

  this.cargarTurnosPorEspecialidad();


 // Hago que tarde un poco. Sino , no me carga nada.
 setTimeout(() => {
  this.polarAreaChartData = [this.contadorEndodoncia, this.contadorPeriodoncia, this.contadorOrtodoncia, this.contadorGeneral]
  }, 500);


}

// events
public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
  console.log(event, active);
}

public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
  console.log(event, active);
}



cargarTurnosPorEspecialidad() 
  {

    var listaTurnosAux = [];

    this.firestore.collection("turnos").get().subscribe((querySnapShot) => {
      querySnapShot.forEach((doc) => {

        if(doc.data().especialista.especialidad == 'Endodoncia')
        {
          this.contadorEndodoncia += 1;  
        }
        
        if(doc.data().especialista.especialidad == 'Periodoncia')
        {
          this.contadorPeriodoncia += 1;  
        }

        if(doc.data().especialista.especialidad == 'Ortodoncia')
        {
          this.contadorOrtodoncia += 1;  
        }

        if(doc.data().especialista.especialidad == 'General')
        {
          this.contadorGeneral += 1;  
        }

      })
    })

    return listaTurnosAux;
    
  }










}


