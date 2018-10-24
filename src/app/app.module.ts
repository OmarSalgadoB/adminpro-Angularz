import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_ROUTES } from './app.routes';//rutas
import { PagesModule } from './pages/pages.module';//modulos
import { AppComponent } from './app.component'; //compónenets
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
// import { IncrementadorComponent } from './components/incrementador/incrementador.component';
//temporal
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//servico para guardar los cambios

import { ServiceModule } from './services/service.module';
import { PagesComponent } from './pages/pages.component';
import { SharedModule } from './shared/shared.module';
//para importar todos los servicios


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
   PagesComponent
   // IncrementadorComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    // PagesModule,// porque se craga de forma dinamica pasando el login
    FormsModule,
    ReactiveFormsModule,
    ServiceModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
