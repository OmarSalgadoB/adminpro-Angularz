import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();  //para poder usar la funcion de jquery en angular
declare const gapi: any; //para usar una libreria de google
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  recuerdame: boolean = false;
  auth2: any; //un objeto de google para optener el token
  constructor( public route: Router,
               public usuarioservice: UsuarioService) { }

  ngOnInit() {
    init_plugins();    //para que entre el plugin perso solo entrara en esta
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    if ( this.email.length > 1 ) {
      this.recuerdame = true;
    }
  }


  googleInit() {
    gapi.load('auth2' , () => {
      this.auth2 = gapi.auth2.init({
       client_id: '245299456266-pv0ml0rkigivkulnp3se2d1rbhddvidp.apps.googleusercontent.com',
       cookiepolicy: 'single_host_origin',
       scope: 'profile email'       //informacion de la persona que se esta conectando
      });
      this.attachSignin(document.getElementById('btnGoogle'));
    });
  }

  attachSignin( elemet) {
    this.auth2.attachClickHandler( elemet, {}, (googleUser) => {
    //  let profile = googleUser.getBasicProfile();
    //  console.log(profile);
     let token  = googleUser.getAuthResponse().id_token; //para obtener el token
     console.log(token);
     //una vez que ya tenemos el token podemos llamar la funcion para logearnos por google
     this.usuarioservice.loginGoogle(token)
     .subscribe(respuesta => {
       console.log(respuesta);
       this.route.navigate(['dashboard']);
     });
    });
  }
  ingresar(forma: NgForm) {
    if ( forma.invalid ) {  //si la forma es ivalida no haga nada simplemenet salte
      return;
    }                         //asi viene del html forma.value.email por eso se pone asi
    let usuario = new Usuario(null, forma.value.email , forma.value.password);
    //creamos una varible del tipo o modelo del usuario como no sabemos el nombre se lo enviamos vacio
    this.usuarioservice.Login(usuario , forma.value.recuerdame)
    .subscribe( correcto => this.route.navigate(['dashboard']));
    // this.route.navigate(['/dashboard']);
  }
}
