import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  titulo: string;
  constructor(private route: Router,
              private title: Title,
              private meta: Meta) {

    this.getDataRouter()
    .subscribe( data => {
       console.log(data);
       this.titulo = data.titulo;
       this.title.setTitle(this.titulo);  //le pasamos el titulo en la apllicacion

       const metaTag: MetaDefinition = {
           name: 'Esto es una pequeña descripcion de la pagina',
           content: this.titulo
       };
       this.meta.updateTag(metaTag);
    });
   }

  ngOnInit() {
  }
 getDataRouter() {
  return this.route.events.pipe(
    filter( evento => evento instanceof ActivationEnd ),//si evento es una instqacia de  ActivationEnd eso es lo que dejara pasar
    filter( (evento: ActivationEnd) => evento.snapshot.firstChild === null ),
    //si el evento trae es evento.snapshot.firstChild esta en null no lo envies
    map( (evento: ActivationEnd)  => evento.snapshot.data)
     //recibimos el evento de tipo ActivationEnd y hacemos un filtro del evento
  );
}

}
