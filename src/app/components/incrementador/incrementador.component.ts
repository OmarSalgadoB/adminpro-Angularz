import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {
  //con esta linea identificamo o hacemos referencia a un objeto html
  @ViewChild('txtprogres') progreshtml: ElementRef;
  // le decimos que estas dos vareiables pueden venir de afuera
  @Input() leyenda: String = 'Leyenda';
  @Input() porcentaje: number = 50;
// sintaxis para emetir un numero como evento
  @Output() cambioValor: EventEmitter <number > = new EventEmitter();

  constructor() {
    console.log(' leyenda' + this.leyenda);
    console.log(' porcentaje' + this.porcentaje);
   }

  ngOnInit() {
  }
 //esta funcion recibe el valor de tipo number que emite el onchanges de ngmodel
  EventongModel( newValue: number) {
   // console.log(newValue);
   //guardamos en una variable el docmento con el nombre en la posicion 0  ya que si hay mas los agrega
    //  let elemtHTML: any = document.getElementsByName('porcentaje')[0];
    if (newValue >= 100) {  //si es 100 o  mayor igualalo
     this.porcentaje = 100;
    } else if (newValue <= 0) { //si es menor a 0 o ihual  asignale 0
          this.porcentaje = 0;
    } else {
        this.porcentaje = newValue; //si newvalue esta entre 1 y 100 entonces asigano a porcentaje
    }
  //  elemtHTML.value = this.porcentaje; //le seteamos el valor al elemento
//ya que salio de todas las validaciones le pasamos el porcentaje al emit
     this.progreshtml.nativeElement.value = this.porcentaje;
     this.cambioValor.emit(this.porcentaje);
     //para tener el foco justo en ese componente
     this.progreshtml.nativeElement.focus();
  }

  aumentarValor(valor: number) {
    if ( this.porcentaje >= 100 && valor > 0) {
      this.porcentaje = 100;
      return;
    }
    if ( this.porcentaje <= 0 && valor < 0) {
      this.porcentaje = 0;
      return;
    }
    this.porcentaje = this.porcentaje + valor;

    this.cambioValor.emit(this.porcentaje);

  }
}
