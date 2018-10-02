import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable()
export class LoginGuardsGuard implements CanActivate {
  constructor( public servico: UsuarioService,
               public router: Router) {

  }
  canActivate() { //nosotros solo vamos a retornar un boolenano
   if ( this.servico.estaLogueado()) {
    console.log('pasoo  por el login guarsd');
    return true;
   } else {
    console.log('fue bloqueado por el guard');
    this.router.navigate(['login']);
    return false;
   }
  }
}
