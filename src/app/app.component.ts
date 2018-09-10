import { Component } from '@angular/core';
import { SettingsService } from './services/settings/settings.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor( public ajuste: SettingsService ) {
//in yectamos el servicio en el contructor del inicio de la aplicacion
  }
}
