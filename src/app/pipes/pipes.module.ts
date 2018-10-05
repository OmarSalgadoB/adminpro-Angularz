import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen.pipe'; //impotamos el pipe

@NgModule({
  imports: [
  ],
  declarations: [
    ImagenPipe
  ],
  exports: [
    ImagenPipe   //para decirle que este pipe se va a poder utilizar desde otra parte
  ]
})
export class PipesModule { }
