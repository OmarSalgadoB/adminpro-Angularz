import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { SubirArchivoService } from '../../services/subirArchivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';
@Component({
  selector: 'app-modal-uploads',
  templateUrl: './modal-uploads.component.html',
  styles: []
})
export class ModalUploadsComponent implements OnInit {

  // oculto: string = '';
  imagenSubir: File;
  imagenTemp: string;
  constructor( public _subirArchivoService: SubirArchivoService,
               public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
  }
  cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;
    this._modalUploadService.ocultarModal();
  }
  seleccionImage( archivo: File) {
    if (!archivo) { //si no viene el archivo simeplemenete salte
    this.imagenSubir = null;
    return;
  }  //si si viene
  //validacion para que solo acepte imagenes
  if ( archivo.type.indexOf('image') < 0) {
    swal('Solo imagenes' , 'Solo se aceptan imagenes', 'error');
    this.imagenSubir = null;
    return;
  }
 this.imagenSubir = archivo;
//java script puro pra la vista previa
 let reader = new FileReader();
 let urlImagentemp = reader.readAsDataURL(archivo);
 reader.onloadend = () => this.imagenTemp = reader.result; //guardamos la imagen base 64 en un strig  la variable
  //  console.log( reader.result); seria para ver la imagen en base 64
  // console.log(this.imagenSubir);
}

subirImagen() {
  this._subirArchivoService
  .subirArchivo( this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id)
  .then( resp => {
    //punto clave si ya se subio la imagen como le hago para decirle a todo el mundo
    //que se subio una imagen
   
    this._modalUploadService.notificacion.emit( resp);
    //usamos el evento para notificar y una vez que avisamos se deve de cerrar ya que no hay nada mas que hacer
    this.cerrarModal();
  })
  .catch( err => {
       console.log(' Error en la Carga....');
  });
}
}
