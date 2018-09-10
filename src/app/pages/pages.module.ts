import { NgModule } from '@angular/core'; //esamos la libreria para decirle que es un mudulo
import { FormsModule} from '@angular/forms';
import { DashboardComponent} from '../pages/dashboard/dashboard.component';
import {ProgressComponent } from '../pages/progress/progress.component';
import {Graficas1Component } from '../pages/graficas1/graficas1.component';
import { PagesComponent} from '../pages/pages.component';

//graficas
import { ChartsModule } from 'ng2-charts';

//modulos
import { SharedModule} from '../shared/shared.module'; //importamos el modulo
//RUTAS
import { PAGES_ROUTES } from './pages.routes';
//para usar el componente personalizado  temporal ya que tenemos que tener un modulo para cargar los componenets generales
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
//porque lo vamos a usar en grafica1 y pertenece a este compoenente
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
@NgModule({
    declarations: [ //es un  arreglo
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    PagesComponent,
    IncrementadorComponent,
    GraficoDonaComponent,
    AccountSettingsComponent
],
exports: [ //como vamos a trabajar con estos componentes pero fuera de este modulo
    DashboardComponent,
    ProgressComponent,
    Graficas1Component
],
  imports: [
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    ChartsModule
  ]
})

export class PagesModule { }
// le poenemos el nombre a nuestro modulo con el que se va a llamar en el general