import { Component, OnInit } from '@angular/core';
declare function init_plugins();
@Component({
  selector: 'app-nopagesfound',
  templateUrl: './nopagesfound.component.html',
  styles: []
})
export class NopagesfoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugins();
  }

}
