
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NopagesfoundComponent } from './shared/nopagesfound/nopagesfound.component';
import { RegisterComponent } from './login/register.component';
import { PagesComponent } from './pages/pages.component';
import { LoginGuardsGuard } from './services/service.index';

const appRoutes: Routes = [
   {path: 'login', component: LoginComponent},
   {path: 'register', component: RegisterComponent},
   {path: '' , //estars rutas las va a cargar despues del loguin
   component: PagesComponent,
   canActivate: [LoginGuardsGuard],
   loadChildren: './pages/pages.module#PagesModule'
   },
   {path: '**', component: NopagesfoundComponent}, //cualquier ruta que no este definida aqui muestra esa pagina
];

export  const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true});
//CREAMOS UNA CONSTANTE PARA EXPORTAR NUESTRAS RUTAS U USAMOS EL FORROOT PARA PASARLE NUESTRAS RUTAS
//PARA USAR EL HAS EN LA URL { useHash: true}