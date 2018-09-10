import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
@Injectable()
export class SettingsService {

  ajustes: Ajustes = {
    temaUrl : 'assets/css/colors/default-dark.css',
    tema : 'default'
  }

  constructor(@Inject(DOCUMENT)   private  _document) {
    this.cargarAjustes();   //para que cuando se inyecte en el app. ts  llamem ha esta funcion
   }

  guardarAjustes() {
    console.log('Guardando en el local Storage');
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
 }
 cargarAjustes() {
   if (localStorage.getItem('ajustes')) {
       this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
       console.log('GARGANDO::: local Storage');
       this.aplicarTema(this.ajustes.tema); //cargamos el tema por defecto
   } else {
    console.log('Usando valores por defecto');
   }
 }

 aplicarTema(tema: string) {
  let url: string = `assets/css/colors/${tema}.css`;
  this._document.getElementById('tema').setAttribute('href', url);
  //buscamos ese id entodo el dom fue con el que pusimos en la link para el estilo
  this.ajustes.tema = tema;
  this.ajustes.temaUrl = url;   //guradamos el tema y la url en el servicio
  this.guardarAjustes();     //guardamos los ajustes en el local strorage
 }
}


interface Ajustes {
   temaUrl: string;
   tema: string;
  }