import { Component, OnInit } from '@angular/core';
import { resolve } from 'path';
import { reject } from 'q';
import { error } from 'protractor';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

     this.contarTres().then(
       mensaje =>  console.log('todo salio bien', mensaje)
     ) //la varible mensaje es lo que recibimos del resolve le podemos poner como queramos
     .catch( error => console.error('Error en la promesa' , error)  //el chatc es por si todo sale mal
    );
   }

  ngOnInit() {
  }

  contarTres(): Promise<boolean> {  //podemos ser mas especificos y indicarle que va a retornar una promesa 
    return new Promise( ( resolve , reject ) => {    //de tipo booleana

           let contador = 0;
     let intervalo =   setInterval( () => {
       contador += 1;
             console.log(contador);
              if (contador === 3) {
               resolve(true);
              // reject('exploto nuestra promesa');
               clearInterval(intervalo);
              }
           }, 1000);
        });
  }
}
