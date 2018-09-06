import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {
//informacion que nesesita ser recivida por parte de afuera
@Input()  public doughnutChartLabels: string [] = [ 'Download Sales' , 'In-Store Sales' , 'Mail-Order Sales' ];
@Input()  public doughnutChartData: number [] = [ 350 , 450 , 100 ];
@Input()  public doughnutChartType: String = 'doughnut' ;

  constructor() { }

  ngOnInit() {
  }

}
