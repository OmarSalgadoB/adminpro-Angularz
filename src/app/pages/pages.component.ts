import { Component, OnInit } from '@angular/core';
declare function init_plugins();
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  init_plugins();         //ya que es la pagina que administra las demas pagina volvemos a poner la funcion
  //de  jquery para que cuando  arranque  entren los plugins
  }

}
