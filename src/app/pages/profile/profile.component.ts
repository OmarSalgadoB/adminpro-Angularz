import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { SubirArchivoService } from '../../services/subirArchivo/subir-archivo.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: string;
  constructor(public  usuarioSer: UsuarioService) {
    this.usuario = usuarioSer.usuario;
   }

  ngOnInit() {
  }
  guardar( usuario: Usuario) {
      console.log(usuario);
      this.usuario.nombre = usuario.nombre; //el priemro es la varible local y la otra es la que recibimos
        if (!this.usuario.google) { //si el usuario no es de google entonses si permite actualizar
          this.usuario.email = usuario.email;
        }
      this.usuarioSer.actualizarUsuario(this.usuario)
               .subscribe();
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

 cambiarImagen() {
    this.usuarioSer.cambiarImagen(this.imagenSubir, this.usuario._id);
 }
}
