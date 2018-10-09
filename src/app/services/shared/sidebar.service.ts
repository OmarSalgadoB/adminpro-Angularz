import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {
 
  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
        submenu: [
          {titulo: 'dashboard' , url: '/dashboard'},
          {titulo: 'progress' , url: '/progress'},
          {titulo: 'grafica1' , url: '/grafica1' },
          {titulo: 'promesas' , url: '/promesas' },
          {titulo: 'rxjs' , url: '/rxjs' },
        ]
    },
    {
      titulo: 'Mantenimiento',
      icono: 'mdi mdi-folder-lock-open',
        submenu: [
          {titulo: 'Usuarios', url: '/usuarios'},
          {titulo: 'Hospitales', url: '/hospitales'},
          {titulo: 'Medicos', url: '/medicos' },
        ]
    }
  ];
  constructor() { }

}
