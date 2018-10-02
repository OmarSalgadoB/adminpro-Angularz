import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardsGuard } from '../services/service.index';

const pagesRoutes: Routes = [
    {path: '', component: PagesComponent,
      canActivate: [ LoginGuardsGuard],
      children: [

         {path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard'}},
         {path: 'progress', component: ProgressComponent, data: { titulo: 'Barra de Progreso'}},
         {path: 'grafica1', component: Graficas1Component, data: { titulo: 'Graficas'}},
         {path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas'}},
         {path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs'}},
         {path: 'account', component: AccountSettingsComponent, data: { titulo: 'Ajustes del Tema'}},
         {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
      ]
    },
 ];

 export  const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
 //porque son rutas hijas  RouterModule.forChild(pagesRoutes);
 //y se importa nen el modulo del componente
