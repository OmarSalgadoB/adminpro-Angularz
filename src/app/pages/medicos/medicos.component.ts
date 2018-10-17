import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/medico/medico.service';
import { Medico } from '../../models/medico.model';
import swal from 'sweetalert2';
@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {
  medicos: Medico[] = [];
  constructor( public _serviceMedico: MedicoService) { }

  ngOnInit() {
   this.cargarMedicos();
  }

  cargarMedicos() {
    this._serviceMedico.cargaMedicos()
    .subscribe( resp => this.medicos = resp );
  }

  buscarMedicos(termino: string) {
   if (termino.length <= 0 ) {
        this.cargarMedicos();
        return;
   }
    this._serviceMedico.buscarMedicos(termino)
      .subscribe( resp => this.medicos = resp);
  }


  eliminarMedico(medico: Medico) {
   this._serviceMedico.borrarMedico(medico._id)
       .subscribe( () => this.cargarMedicos() );
  }
}
