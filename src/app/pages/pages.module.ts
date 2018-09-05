import { NgModule } from '@angular/core'; //esamos la libreria para decirle que es un mudulo

import { DashboardComponent} from '../pages/dashboard/dashboard.component';
import {ProgressComponent } from '../pages/progress/progress.component';
import {Graficas1Component } from '../pages/graficas1/graficas1.component';
import { PagesComponent} from '../pages/pages.component';
//modulos
import { SharedModule} from '../shared/shared.module'; //importamos el modulo
//RUTAS
import { PAGES_ROUTES } from './pages.routes';
@NgModule({
    declarations: [ //es un  arreglo
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    PagesComponent,
],
exports: [ //como vamos a trabajar con estos componentes pero fuera de este modulo
    DashboardComponent,
    ProgressComponent,
    Graficas1Component
],
  imports: [
    SharedModule,
    PAGES_ROUTES
  ]
})

export class PagesModule { }
// le poenemos el nombre a nuestro modulo con el que se va a llamar en el general