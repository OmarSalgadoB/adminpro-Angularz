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
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PipesModule } from '../pipes/pipes.module';
import { ProfileComponent } from './profile/profile.component';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ModalUploadsComponent } from '../components/modal-uploads/modal-uploads.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';


@NgModule({
    declarations: [ //es un  arreglo
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    // PagesComponent,
    IncrementadorComponent,
    GraficoDonaComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    ProfileComponent,
    UsuariosComponent,
    // ModalUploadsComponent, va hacer usado directamente por el pagecomponente
    HospitalesComponent,
    MedicosComponent,
    MedicoComponent,
    BusquedaComponent,
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
    ChartsModule,
    PipesModule,
    CommonModule  //para manejar las directivas del ngif en las imagenes
  ]
})

export class PagesModule { }
// le poenemos el nombre a nuestro modulo con el que se va a llamar en el general