import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {

    let url = URL_SERVICIOS +  '/img';
    if ( !img) { //si no recibo niniguna imagen manda la imagne por defecto
        return url + '/usuarios/xxx';
    }
    if ( img.indexOf('https') >= 0) { //si la imagen trae un https retorna la imagen sabemos que es de google
       return img;
    }
    //podemos tener 3 tipos distintos de imagenes
    switch ( tipo) {
       case 'usuario':
           url += '/usuarios/' + img;
       break;
       case 'medico':
          url += '/medicos/' + img;
       break;
       case 'hospital':
            url += '/hsopitales/' + img;
       break;
       default:
        console.log('Tipo de imagen no exite , usuarios medicos o hospitales');
        url +=  '/usuarios/xxx';
    }
    return url;
  }

}
