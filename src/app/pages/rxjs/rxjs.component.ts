import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable'; //para producccion seria esto
import { retry, map, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subcrition: Subscription; //creamos una variable de tipo subcription
  constructor() {
    //declaramos una varible y le decimos que va hacer un observable
this.subcrition = this.regresaObservable()
   .subscribe( // 3 posibles tipos de ecenarios en un observable
     numero => console.log('Subscribe::' , numero),
     error => console.log('Error en el observable:' , error),
     () => console.log('El  observable ha terminado')
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
   console.log('La pagina se va a destruir');
   this.subcrition.unsubscribe(); //para el observable cuando de dejemos la pagina
  }
  regresaObservable(): Observable<any> {
//le especificamos que retornara un observable de tipo numbre 
//esto significa que cuando nos susbcrebamos vamos a tener los metodos de un numbre y lo tratara asi 
      return  new Observable( observer => {
        //retornamos todo nuestro codigo y ahorramos lineas de codigo
      let contador = 0;
      let intervalo  = setInterval( () => {
        contador += 1;
        const salida = {  //creamos un un objeto simulando consumo de aPI
            valor: contador
        };
        observer.next(salida); //LE PASAMOS EL OBJETO
        // if (contador === 3) { //Si el contador  es igual a 3
        //     clearInterval(intervalo); //le decimos que pare el intevalo
        //     observer.complete(); //cerramos el flujo de datos
        // }
        // if (contador === 2) {
        //   clearInterval(intervalo);
        //   observer.error('Auxiliio me destruyo');
        // }
      }, 1000);
    }).pipe(
     map( resp => {
       let valor: any;
       valor = resp;
        return  valor;
     }),
     filter( ( valor , index) => { //el operador index recibe el valor y el index 
      // console.log('Operador Filter::', valor , index);
      if ( (valor % 2) === 1) {
          return true;
          //numero impar
      } else {
         //numero par
        return false;
      }
     })
    );
  }
}
