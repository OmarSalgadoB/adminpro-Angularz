
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NopagesfoundComponent } from './shared/nopagesfound/nopagesfound.component';
import { RegisterComponent } from './login/register.component';

const appRoutes: Routes = [
   {path: 'login', component: LoginComponent},
   {path: 'register', component: RegisterComponent},
   {path: '**', component: NopagesfoundComponent}, //cualquier ruta que no este definida aqui muestra esa pagina
];

export  const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true});
//CREAMOS UNA CONSTANTE PARA EXPORTAR NUESTRAS RUTAS U USAMOS EL FORROOT PARA PASARLE NUESTRAS RUTAS
//PARA USAR EL HAS EN LA URL { useHash: true}