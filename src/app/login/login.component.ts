import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare function init_plugins();  //para poder usar la funcion de jquery en angular
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( public route: Router) { }

  ngOnInit() {
    init_plugins();    //para que entre el plugin perso solo entrara en esta
  }
  ingresar() {
    console.log('Ingresando desde Login');
    this.route.navigate(['/dashboard']);
  }
}
