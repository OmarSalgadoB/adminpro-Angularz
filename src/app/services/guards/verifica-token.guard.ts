import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsuarioService } from '../usuario/usuario.service';
import { reject } from 'q';

@Injectable()
export class VerificaTokenGuard implements CanActivate {

  constructor(public _usuarioService: UsuarioService,
              public router: Router) {

  }
  canActivate():  Promise<boolean> | boolean {
    console.log('Estamos Verificando el Token con  GUard');
    let token = this._usuarioService.token; //traremos el token del servico porque nos interesa
    //para saber si es valido
    //vamos a sacar contenido del token
    let payload = JSON.parse( atob(token.split('.')[1]));
    // atob() ES UNA FUNCION PARA DECODOFICA EN BASE 64 PARA EL TOKEN
   let expirado =  this.expirado(payload.exp);
   //recordar que regresa un booleano
    if (expirado) { //si el token si esta expirado  sacalo y redirilo
      this.router.navigate(['/login']);
      return false;
    }
    return this.verificaRenueva(payload.exp);
  }
  //validar si en token esta proximos a vencer
  verificaRenueva(fechaExp: number): Promise<boolean> {

      return new Promise( (resolve, reject ) => {
        let tokenExp = new Date( fechaExp * 1000);
        let ahora = new Date(); //aqui usamos la hora del sistema pero tambien podemos traer la hora desde la bbdd
        ahora.setTime( ahora.getTime() + (4 * 60 * 60 * 1000));
  //(4 * 60 * 60 * 1000)) estamos renovando el token cada que regresque la pagina dasboard y
  //siempre lo estamos renovando podemos cambiar el 4 por el 1 y haci cuando falte una hora lo actualizara
  //y tambien podrimos poner el can, avtive en cada pagina para que cuando este en cualquiera y 
  //falte una hora o 4 o siempre se actualize el token
        // console.log(tokenExp);
        // console.log(ahora);
        if (tokenExp.getTime() > ahora.getTime() ) {
          resolve(true);  //si pasa esto el token anu no esta por expiarar
        } else { //si entra el else quiere dicir que si ya esta por expirar
                this._usuarioService.renuevaToken() //usamos la funciopn del servicio
                    .subscribe( () => {
                      resolve(true);
                    }, () => {
                      this.router.navigate(['/login']);
                      reject(false);
                    });
        }

       
      });
  }


  expirado(fechaExp: number) {
    let hora = new Date().getTime() / 1000; //para que nos de la hecha en milisegundos

    if (fechaExp < hora) {
      return true;  //que esta expirado
    } else {
      return false; //que no esta expirado
    }
  }
}
