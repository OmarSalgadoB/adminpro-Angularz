import { NgModule } from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {BreadcrumbsComponent} from './breadcrumbs/breadcrumbs.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import { NopagesfoundComponent} from './nopagesfound/nopagesfound.component';

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
    ]
})
export class SharedModule {}