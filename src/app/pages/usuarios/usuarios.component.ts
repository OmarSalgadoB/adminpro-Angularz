import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-uploads/modal-upload.service';
// declare var swal: any;
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
//crereamos una varible y le decimos que va hacer un arreglo de usuarios
  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor( public _usuarioService: UsuarioService,
               public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsarios();
//llamos al servicio y a la notificacion y nos subcribimos y llamamos a nuestra funcion local de
//Cargar usuarios para que refresque
    this._modalUploadService.notificacion
        .subscribe( resp => this.cargarUsarios());
  }
//como observacion cuando llamos a la funcio carga usuarios  esta la pagina actual

  cargarUsarios() {
      this.cargando = true;
      this._usuarioService.cargarUsarios(this.desde)
            .subscribe( (resp: any) => {
              console.log(resp);
              this.totalRegistros = resp.total;
              this.usuarios = resp.Usuarios;
              this.cargando = false;
            });
  }
  cambiarDesde(valor: number) {
   let desde = this.desde + valor;
   console.log(desde);
   if (desde >= this.totalRegistros) { //si el valor es mayoy o igual al total de registro no se puede
      return; //Salte
   }
   if (desde < 0 ) { //si el valor desde es menor a cero no se puede
       return;
   }
    this.desde += valor;
    this.cargarUsarios();
  }

  buscarUsuario( termino: string) {
    if ( termino.length <= 0) { //si el termino es menor a 0 entonses carga la funcion de usuarios
      this.cargarUsarios();
      return;
    }
    this.cargando = true;
    //  console.log(termino);
      this._usuarioService.buscarUsuarios(termino)
            .subscribe( (usuarios: Usuario[] ) => {
                console.log( usuarios);
                this.usuarios = usuarios;
                this.cargando = false;
            });
  }

  borrarUsuario(usuario: Usuario) {
   //si el suuariid es el mismo del usuarios que esta logueado manda mensaje
    if ( usuario._id === this._usuarioService.usuario._id) {
      swal('No puedes eliminar Usuario' , 'No te puedes eliminar a ti mismo', 'error');
      return;
    }
    swal({
      title: 'Estas Seguro?',
      text: 'Estas a punto de borrar a  ' + usuario.nombre,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => { //si en el mensaje le ponemos que si entraria a esta parte
      if (result.value) {
           this._usuarioService.borrarUsarios(usuario._id)
               .subscribe( borrado => {
                  console.log(borrado);
                  this.cargarUsarios(); //para que luego luego carge los usuarios
               });
      }
    });
  }
//para guardara el role del usuario en la pagina de mantenimiento
  guardarUsario(usuario: Usuario) {
     this._usuarioService.actualizarUsuario(usuario)
          .subscribe();
  }

  mostrarModal(usuario: Usuario) {
    this._modalUploadService.mostarModal('usuarios', usuario._id);
  }
}
