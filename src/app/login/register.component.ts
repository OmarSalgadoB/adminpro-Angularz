import { Component, OnInit, group } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert2'; //esta libreria es la buena para las alertas
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

declare function init_plugins();
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup; //esta variable la usaremos del lado de html
  constructor( public usuarioService: UsuarioService,
               private router: Router) { }  //par poder aser peticiones http: HttpClient


  sonIguales( campo1: string, campo2: string) {
   return ( group: FormGroup ) => {
     let pass1 = group.controls[campo1].value;
     let pass2 = group.controls[campo2].value;
     if ( pass1 === pass2 ) {
           return null;
     }
     return {
       sonIguales : true   //seria el error que no le permitira al formulario continuar
     };

   };
}

  ngOnInit() {
    init_plugins();
    this.forma = new FormGroup({
      nombre : new FormControl(null , Validators.required),
      correo : new FormControl(null , [Validators.required, Validators.email]),
      password : new FormControl(null , Validators.required),
      password2 : new FormControl(null , Validators.required),
      condiciones : new FormControl(false),
    }, {validators: this.sonIguales( 'password' , 'password2')});
    //agregamos una funcion para validar con reactive si los password son iguales
//para llenar el formulario con data en cuanto carge la pagina
    this.forma.setValue({
      nombre : 'omar',
      correo : 'test1@hotmail.com',
      password : '123456',
      password2 : '122345',
      condiciones : false
    });
  }
  registrarUsuario() { //esta funcion se ejecuta cuando enviamos el submit
    if ( this.forma.invalid) {
     return;
    }
   if (!this.forma.value.condiciones) {
    swal('Advertencia' , 'Debes de aceptar las Condiciones', 'warning');
    return;
   }
  console.log(this.forma.value); //imprimos el objetos con sus atributos
 //si todo sale bien entonces creamos el usuario y le ponemos susu atributos
  let usuario = new Usuario(
    this.forma.value.nombre,
    this.forma.value.correo,
    this.forma.value.password,
  );
  //usamos la varible del serivicio llamamos su metodo y nos suscribimos imprimimos la respuesta
  this.usuarioService.crearUsario(usuario)
                 .subscribe( resp => {
                  console.log(resp);
                  this.router.navigate(['/login']);//si todo sale bien redirecciona a la pagina de login
                 });
}

}
