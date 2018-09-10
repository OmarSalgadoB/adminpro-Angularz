import { Component, OnInit ,Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { SettingsService } from '../../services/settings/settings.service';



@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(private _setting: SettingsService,
    @Inject(DOCUMENT)   private  _document) { }
//con lo que pusimos en el contructor hacemos referecia a todo el DOM de la apalicacion
  ngOnInit() {
  }
  cambiarcolor(tema: string , link: any) {
    console.log(link);
    this.aplicarCheck(link);
    this._setting.aplicarTema(tema); //usamos el servicio para enviar el tema
  }


  aplicarCheck(link: any) {
     let selectores: any = this._document.getElementsByClassName('selector');
     //guardamos los componentes o selectores que tengan esa clase en un arreglo
     for (let ref of selectores) {
          ref.classList.remove('working');//recorremos el arreglo y quitamos esa clase de todos
     }
     link.classList.add('working');//despues de que reccora le agreamos la clase solo al link 
  }

  colocarcheck(){
    let selectores: any = this._document.getElementsByClassName('selector');
    let tema = this._setting.ajustes.tema; //usamos el servicio para llegar al tema
    for (let ref of selectores) {  //con banila js leeemos cualquier atrubto html y le dedimos si es igual al temas
      if ( ref.getAttribute('data-theme') === tema) {
        ref.classList.add('working');
        break;  //salgo del ciclo for
      }
 }
  }
}
