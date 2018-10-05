import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config'; //IMPORTAMOS LA CONSTANTE DE CONFIGURACION
import 'rxjs/add/operator/map'; //libreria para usar el operador map
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';
@Injectable()
export class UsuarioService {
   usuario: Usuario;
   token: string;
  constructor(public http: HttpClient,
              public router: Router,
              public subir:  SubirArchivoService) {
    console.log('el servicio esta listo para usarse');
    this.cargarStorage();
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
  } else {
     this.token = '';
     this.usuario = null;
  }
}
//============================================
 //guardar storage
guardarStorage( id: string, token: string, usuario: Usuario ) {

  localStorage.setItem('id', id );
  localStorage.setItem('token', token );
  localStorage.setItem('usuario', JSON.stringify(usuario) );

  this.usuario = usuario;
  this.token = token;
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
        this.guardarStorage(data.id, data.token, data.usuario );
       return true; //PODEMOS OBIAL EL PASO SOLO ES COMO PARA DECIR SI SE LOGEO
  });
}
//========================================
 //logout
//========================================
logout() {
  this.usuario = null;   //resetiamos las varibles
  this.token = '';
   //tambien las removemos del local storaage
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');

  this.router.navigate(['/login']);
}

//creamos un metodo para llamar
   crearUsario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario';
   return  this.http.post(url, usuario)
           .map( (res: any) => { //envolvemos la repuesta para que no marque errror en el return
            swal('Usuario Creado' , usuario.email, 'success');
            return res.usuario;
           });
   }

   //Actualizar Usuario ya estando dentro de la palicacio

     actualizarUsuario(usuario: Usuario) {
         let url = URL_SERVICIOS + '/usuario/' + usuario._id;
         url += '?token=' + this.token; //enviamos el token se lo concatenamos
        //  console.log(url);
        return  this.http.put(url, usuario)
                .map( (data: any) => {
                  let usuarioDB = data.usuario; //guardamos en una variable el usuario
                  this.guardarStorage( usuarioDB, this.token, usuarioDB);
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
                 this.guardarStorage(id, this.token, this.usuario);
                })
               .catch( resp => {
                console.log(resp);
               });
     }
}
