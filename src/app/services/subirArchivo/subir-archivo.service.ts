// import { Injectable } from '@angular/core';
// import { URL_SERVICIOS } from '../../config/config';
// @Injectable()
// export class SubirArchivoService {
//   constructor() {
//   }
  
 
// //pasa subir cualquier tipo de archivo
//   subirArchivo( archivo: File , tipo: string, id: string) {
//     return new Promise( (resolve, reject) => {
//       let formData = new FormData(); //creamis una varible de ese tipo
//       let xhr = new XMLHttpRequest();   //inicializemos la peticion de ajaxa
//       formData.append( 'imagen' , archivo, archivo.name); //le pasomos los datos de nuestro archivo
//       xhr.onreadystatechange = function () { //INICIALIZAMOS LA  FUNCION AJAX
//           if ( xhr.readyState === 4) {
//               if (xhr.status === 200) {
//                   console.log('IMAGEN SUBIDA');
//                   resolve( JSON.parse(xhr.response)); //si resuelve bien enviamos la foto
//               } else {//SE ENVUELVE PARA MANEJARLO COMO UN OBJETO
//                 console.log('Fallo la imagen subida');
//                 reject(xhr.response);
//               }
//           }
//       };
//       let url = URL_SERVICIOS + '/uploads/' + tipo + '/' + id;

//       xhr.open('PUT' , url, true);
//       xhr.send(formData);
//     });
//   }

// }
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';

@Injectable()
export class SubirArchivoService {

  constructor() { }


  subirArchivo( archivo: File, tipo: string, id: string ) {
// console.log('sibir archivos service' + archivo , tipo , id);
    return new Promise( (resolve, reject ) => {

      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      formData.append( 'imagen', archivo, archivo.name );
      // console.log('esta aqui llega');
      xhr.onreadystatechange = function() {
          // console.log('esta aqui llega');
        if ( xhr.readyState === 4 ) {
          // console.log('esta aqui llega2');
          if ( xhr.status === 200 ) {
            console.log( 'Imagen subida' );
            resolve( JSON.parse( xhr.response ) );
          } else {
            console.log( 'Fallo la subida' );
            reject( xhr.response );
          }

        }
      };

      let url = URL_SERVICIOS + '/uploads/' + tipo + '/' + id;

      xhr.open('PUT', url, true );
      xhr.send( formData );

    });




  }

}
