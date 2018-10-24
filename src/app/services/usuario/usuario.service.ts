import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config'; //IMPORTAMOS LA CONSTANTE DE CONFIGURACION
import 'rxjs/add/operator/map'; //libreria para usar el operador map
import 'rxjs/add/operator/catch'; //para manejar el error
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import 'rxjs/add/observable/throw';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
@Injectable()
export class UsuarioService {
   usuario: Usuario;
   token: string;
   menu: any[] = [];
  constructor(public http: HttpClient,
              public router: Router,
              public subir:  SubirArchivoService) {
    console.log('el servicio esta listo para usarse');
    this.cargarStorage();
   }

//rENOVAR TOKEN
renuevaToken () {
  let url =  URL_SERVICIOS + '/login/renuevaToken';
  url += '?token=' + this.token;

  return  this.http.get(url)
            .map( (rep: any) => {
               this.token = rep.token;
               localStorage.setItem('token', this.token );
               return true;
            })
            .catch( err => {
              this.router.navigate(['/login']);
              swal('Error en el token' , 'No se puedo actualizar token', 'error');
              return Observable.throw(err);
       });
}

//para validat que este loguiado y usar los guards
estaLogueado() {
 return (this.token.length > 5) ? true : false;
}
//cargar del local storage
cargarStorage() {
  if (localStorage.getItem('token')) {
     this.token = localStorage.getItem('token');
     this.usuario = JSON.parse(localStorage.getItem('usuario')) ;
     this.menu = JSON.parse(localStorage.getItem('menu')) ;
  } else {
     this.token = '';
     this.usuario = null;
     this.menu = [];
  }
}
//============================================
 //guardar storage
guardarStorage( id: string, token: string, usuario: Usuario, menu: any ) {

  localStorage.setItem('id', id );
  localStorage.setItem('token', token );
  localStorage.setItem('usuario', JSON.stringify(usuario) );
  localStorage.setItem('menu', JSON.stringify(menu) );
  this.usuario = usuario;
  this.token = token;
  this.menu = menu;
}

//login google
loginGoogle( token: string) {
  let url =  URL_SERVICIOS + '/login/google';
  return this.http.post( url , {token});
}
//login
Login( usuario: Usuario, recuerdame: boolean = false) {
  if ( recuerdame ) { //si el recuerdame biene en true entonces graba esto en el local storage
      localStorage.setItem('email', usuario.email);
  } else { //si no viene eliminalo solo como por seguridad
     localStorage.removeItem('email');
  }
  //recibimos un booleamo una  variable de tipo booleana
 let url =  URL_SERVICIOS + '/login';
 return this.http.post(url, usuario) //mandamos el url y el usuario en el post
  .map((data: any) => { //MANUMULAMOS LA DATA PARA GRABARLA EN EL LOCAL STORAGE
       console.log(data);
       this.guardarStorage(data.id, data.token, data.usuario, data.menu );
       return true; //PODEMOS OBIAL EL PASO SOLO ES COMO PARA DECIR SI SE LOGEO
  })
  .catch( err => {
         console.log(err.error.mensaje);
         swal('Error en el login' , err.error.mensaje, 'error');
         return Observable.throw(err);
  });
}
//========================================
 //logout
//========================================
logout() {
  this.usuario = null;   //resetiamos las varibles
  this.token = '';
  this.menu = [];
   //tambien las removemos del local storaage
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
  localStorage.removeItem('menu');
  this.router.navigate(['/login']);
}

//creamos un metodo para llamar
   crearUsario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario';
   return  this.http.post(url, usuario)
           .map( (res: any) => { //envolvemos la repuesta para que no marque errror en el return
            swal('Usuario Creado' , usuario.email, 'success');
            return res.usuario;
           })
           .catch( err => {
        
            swal(err.error.mensaje , err.error.errors.message, 'error');
            return Observable.throw(err);
     });
   }

   //Actualizar Usuario ya estando dentro de la palicacio

     actualizarUsuario(usuario: Usuario) {
         let url = URL_SERVICIOS + '/usuario/' + usuario._id;
         url += '?token=' + this.token; //enviamos el token se lo concatenamos
        //  console.log(url);
        return  this.http.put(url, usuario)
                .map( (data: any) => {
                  if ( usuario._id === this.usuario._id) { //usuario logeado y usuario respuesta
                    let usuarioDB = data.usuario; //guardamos en una variable el usuario
                    this.guardarStorage( usuarioDB, this.token, usuarioDB, this.menu);
                  }
                   swal('Usuario Actualizado' , usuario.nombre, 'success');
                   return true;
                });
     }


     //para cambiar la imagen del usuario porque desde qui porque tenemos caso todos los datos aki

     cambiarImagen( archivo: File , id: string) {
      //  console.log('Hasta aki vamos bien' + archivo, id);
         this.subir.subirArchivo( archivo, 'usuarios' , id)
               .then( (resp: any) => {
                 console.log(resp);
                 this.usuario.img = resp.usuario.img;
                 //le decimos que la pripiedas del usuario logeado img sera igual al resltado de la respuesta
                 swal('Imagen Actualizada' , this.usuario.nombre, 'success');
                 //y ahora si guardamos en el storage
                 this.guardarStorage(id, this.token, this.usuario, this.menu);
                })
               .catch( resp => {
                console.log(resp);
               });
     }

     //CARGAR USUARIOS
     cargarUsarios(desde: number = 0) {

         let url = URL_SERVICIOS + '/usuario?desde=' + desde;
         return this.http.get(url);

     }
     //busqueda por collecccion
     buscarUsuarios(termino: string) {
       let url = URL_SERVICIOS + '/busqueda/collection/usuarios/' + termino;

       return this.http.get(url)
       .pipe(map( (resp: any) => {
          return resp.usuarios;
       }));
     }

     //Borrar  Uusarios
     borrarUsarios( id: string) {
      let url = URL_SERVICIOS + '/usuario/' + id;
      url += '?token=' + this.token;
      return this.http.delete(url)
              .map( resp => {
                swal('Usario Eliminado' , 'El usuario Fue Elimando Correctamente', 'success');
                return true;
              });
     }

}
