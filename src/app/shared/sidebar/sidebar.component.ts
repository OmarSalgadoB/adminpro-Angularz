import { Component, OnInit } from '@angular/core';
import { SidebarService, UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  usuario: Usuario;
  constructor(private menuSer: SidebarService,
              private usuarioSer: UsuarioService) { }

  ngOnInit() {
     this.usuario = this.usuarioSer.usuario;
  }

}
