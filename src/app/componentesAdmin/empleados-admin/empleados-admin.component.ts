import { Component, OnInit } from '@angular/core';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { DatabaseService } from '../../servicios/database.service'

// ANGULAR FIRESTORE.
import { AngularFirestore } from '@angular/fire/firestore';



@Component({
  selector: 'app-empleados-admin',
  templateUrl: './empleados-admin.component.html',
  styleUrls: ['./empleados-admin.component.scss']
})
export class EmpleadosAdminComponent implements OnInit {


  listaUsuariosNOClientes = [];


  // TABLA:
  displayedColumns: string[] = ['nombre', 'apellido', 'ingreso'];
  listado : any[]=[];


  constructor(private dataBase : DatabaseService,
    private firestore : AngularFirestore) { }

  ngOnInit(): void {

    this.listado = this.cargarUsuariosNOClientes("Cliente");

    console.log(this.listado);

  
  }


  cargarUsuariosNOClientes(tipoUsuario : string) : any
  {

    var listaUsuarios = [];
    this.firestore.collection("usuarios").get().subscribe((querySnapShot) => {
      querySnapShot.forEach((doc) => {

        // Correo de la BD == Correo de la lista.
       if(doc.data().tipo != tipoUsuario)
       {
        listaUsuarios.push(doc.data());  
       }

      })
    })

    return listaUsuarios;
  }


  


}
