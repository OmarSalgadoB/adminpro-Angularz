
import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages/pages.component';//se podria decri que es la principal

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Graficas1Component } from './pages/graficas1/graficas1.component';
import { NopagesfoundComponent } from './shared/nopagesfound/nopagesfound.component';
import { RegisterComponent } from './login/register.component';



const appRoutes: Routes = [
   {path: '', component: PagesComponent,
     children: [
//todas la rutas que van a trabajar con el router secundario osea el que esta dentro de PagesComponent
        {path: 'dashboard', component: DashboardComponent},
        {path: 'progress', component: ProgressComponent},
        {path: 'grafica1', component: Graficas1Component},
        {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
     //ruta cuando no existe ninguna ruta osea cualquieer ruta va hacer un redirect
     ]},
   {path: 'login', component: LoginComponent},
   {path: 'register', component: RegisterComponent},
   {path: '**', component: NopagesfoundComponent}, //cualquier ruta que no este definida aqui muestra esa pagina
];

export  const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true});
//CREAMOS UNA CONSTANTE PARA EXPORTAR NUESTRAS RUTAS U USAMOS EL FORROOT PARA PASARLE NUESTRAS RUTAS
//PARA USAR EL HAS EN LA URL { useHash: true}