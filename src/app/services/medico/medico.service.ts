import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import swal from 'sweetalert2';
import { Medico } from '../../models/medico.model';

@Injectable()
export class MedicoService {
totalmedicos: number;
  constructor( public http: HttpClient,
               public _usuarioService: UsuarioService) { }


  cargaMedicos() {
    let url = URL_SERVICIOS + '/medico';
     return this.http.get(url)
     .map( (resp: any) => {
         this.totalmedicos = resp.total; //aqui de la respuesta sacamos un valor y se la asigamos a una variable
         return resp.medicos;
         //solo retornamos la respuesta pero con el objeto medico eso viene de bancken asi postman
     });
  }

 //busqueda por collecccion
 buscarMedicos(termino: string) {
  let url = URL_SERVICIOS + '/busqueda/collection/medicos/' + termino;
  return this.http.get(url)
  .map( (resp: any) => resp.medicos);
}
    //Borrar  medico
    borrarMedico( id: string) {
      let url = URL_SERVICIOS + '/medico/' + id;
      url += '?token=' + this._usuarioService.token;
      return this.http.delete(url)
              .map( resp => {
                swal('Medico Eliminado' , 'El medico fue eliminado', 'success');
                return true;
              });
     }

     guadarMedico( medico: Medico) {
      let url = URL_SERVICIOS + '/medico';

      if (medico._id ) {
        //actualizando  te puede giar del postma para ver como esta el servico
        url += '/' + medico._id;
        url += '?token=' + this._usuarioService.token;
        return this.http.put(url, medico)
               .map(( resp: any) => {
                swal('Medico Actualizado' , medico.nombre, 'success');
                return resp.medico;
               });

      } else {
        // creando
        url += '?token=' + this._usuarioService.token;
              return    this.http.post( url , medico)
                .map( (resp: any) => {
                  swal('Medico Creado' , medico.nombre, 'success');
                   return resp.Medico;
                });
      }
     }

     //Cargar Medico por id
     cargaMedico(id: string) {
      let url = URL_SERVICIOS + '/medico/' + id;
      return this.http.get(url)
             .map( (resp: any) => resp.medico);
     }

}
