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
        ]
    }
  ];
  constructor() { }

}
