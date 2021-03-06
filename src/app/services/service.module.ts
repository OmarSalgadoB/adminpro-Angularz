import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService, SidebarService, SharedService, UsuarioService, LoginGuardsGuard,
SubirArchivoService, HospitalService, MedicoService, AdminGuard, VerificaTokenGuard} from './service.index';
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-uploads/modal-upload.service';





@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [    //proveemos los servicios
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    LoginGuardsGuard,
    SubirArchivoService,
    ModalUploadService,
    HospitalService, 
    MedicoService,
    AdminGuard,
    VerificaTokenGuard
  ],
  declarations: []
})
export class ServiceModule { }
