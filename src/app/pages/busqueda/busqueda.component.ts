import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Usuario } from '../../models/usuario.model';
import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {
  usuarios: Usuario [] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];
  constructor(public activate: ActivatedRoute,
             public http: HttpClient) {

    activate.params
       .subscribe( params => {
         let termino = params['termino']; //el termino se pone porque asi lo pusimos en las rutas
        // console.log(termino);
         this.buscar(termino);
       });
   }

  ngOnInit() {
  }

  buscar(termino: string ) {
    let url = URL_SERVICIOS + '/busqueda/todo/' + termino;
    this.http.get(url)
               .subscribe( (resp: any) => {
                 console.log(resp);
                 this.usuarios = resp.usuario;
                 this.medicos = resp.medicos;
                 this.hospitales = resp.hospitales;
               });
  }
}
