import { Injectable, EventEmitter } from '@angular/core';


@Injectable()
export class ModalUploadService {
//esta informacion la vamos a tener que recibir desde cualquier parte de afuera
  public tipo: string;
  public id: string;
  public oculto: string = 'oculto';

  public notificacion = new EventEmitter<any>();
  constructor() {
    console.log('Esta llamado al servicio de ModalUpload');
   }

   ocultarModal() {
    this.oculto = 'oculto';
    this.tipo = null; //esto se hace para setiar los valores y no haya problemas
    this.id = null;
   }
    //cuando llamemos a esta funcion vamos a recibir 2 parametros
   mostarModal( tipo: string, id: string) {
       this.oculto = '';
      //las varibles que recibamos bva a ser iguales a las que tenemos en nuestro componente
       this.tipo = tipo;
       this.id = id;
   }
}
