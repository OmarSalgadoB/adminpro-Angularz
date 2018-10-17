import { Injectable } from '@angular/core';
import swal from 'sweetalert2';
import { Observable } from 'rxjs/Observable';
import { URL_SERVICIOS } from '../../config/config'; //IMPORTAMOS LA CONSTANTE DE CONFIGURACION
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { Hospital } from '../../models/hospital.model';



@Injectable()
export class HospitalService {
  hospital: Hospital;
  token: string;
  totalHospitales: number;
  constructor( public http: HttpClient,
               public _usuarioService: UsuarioService
               ) {
    console.log('estas llamando al servicio hospitales');
   }

  cargarHospitales() {
    let url = URL_SERVICIOS + '/hospital';
    return this.http.get(url).map( (resp: any) => {
           this.totalHospitales = resp.total; //para tener la pripierdad
           return resp.hospitales; //para solo retornal hospitales como en la tarea
    });
  }
  obtenerHospital( id: string ) {
    let url = URL_SERVICIOS + '/hospital/' + id;
      return this.http.get(url)
      .map( (resp: any) => resp.hospital);
  }

   //Borrar  Hospital
   borrarHospital( id: string) {
    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete(url)
            .map( resp => {
              swal('Hospital Eliminado' , 'El hospital fue eliminado', 'success');
              return true;
            });
   }

  //metodo crear Hopsital
 crearHospital(nombre: string) {
  let url = URL_SERVICIOS + '/hospital';
  url += '?token='  + this._usuarioService.token;
      return this.http.post(url, {nombre}) //aqui tuvimos porblemas nosotros solo enviavamos el nombre
            .map( (resp: any) => resp.hospital); //y se tiene que enviar el objeto por hacie decirlo
 }                                //el suaurio lo jala del token

 //busqueda por collecccion
 buscarHospital(termino: string) {
  let url = URL_SERVICIOS + '/busqueda/collection/hospitales/' + termino;
  return this.http.get(url)
  .map( (resp: any) => resp.hospitales);
}

actualizarHospita(hospital: Hospital) {
  let url = URL_SERVICIOS + '/hospital/' +  hospital._id;
  url += '?token='  + this._usuarioService.token;
  return this.http.put(url , hospital)
                .map( (resp: any) => {
                  swal('Hospital Actualizado' , hospital.nombre, 'success');
                 return    resp.hospital;
              }) ;
}

}
