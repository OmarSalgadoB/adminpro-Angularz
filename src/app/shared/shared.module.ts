import { NgModule } from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {BreadcrumbsComponent} from './breadcrumbs/breadcrumbs.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import { NopagesfoundComponent} from './nopagesfound/nopagesfound.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; //viene con el uso de ngif  ngfor pipes

@NgModule({
    declarations: [
        HeaderComponent,
        BreadcrumbsComponent,
        SidebarComponent,
        NopagesfoundComponent
    ],
    exports: [  //vamos a trabajar con estos componentes fuera de este modulo
        HeaderComponent,
        BreadcrumbsComponent,
        SidebarComponent,
        NopagesfoundComponent
    ],
    imports: [
        RouterModule,  //para poder utiñizar el router y movesr en las rutas
        CommonModule
    ]
})
export class SharedModule {}