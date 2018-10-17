import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-uploads/modal-upload.service';
import swal from 'sweetalert2';
import { Hospital } from '../../models/hospital.model';
@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {
 hospitales: Hospital[];
  constructor( public _hospitalService: HospitalService,
               public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion
         .subscribe( () => this.cargarHospitales());
  }
  cargarHospitales() {
    this._hospitalService.cargarHospitales()
    .subscribe(resp =>   this.hospitales = resp);
    // no estavamos asiendo ninguna asignacion
  }
  guardarHospital(hospital: Hospital) {
     this._hospitalService.actualizarHospita(hospital)
          .subscribe();
  }
  borrarHospital(hospital: Hospital) {
   this._hospitalService.borrarHospital(hospital._id)
        .subscribe( () => this.cargarHospitales());
        //en el susbcribe no recibo nada pero quiero cargar de nuevo los hospitales
  }
  buscarHospital( termino: string ) {
    if ( termino.length <= 0) {
      this.cargarHospitales();
      return;
    }
    this._hospitalService.buscarHospital( termino)
          .subscribe( resp => this.hospitales = resp );
  }
  crearHospital() {
    swal({
      title: 'Ingresa Hospital',
      input: 'text' ,
      type: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then( (result) => {
      if (!result.value) {
         return;
      }
      this._hospitalService.crearHospital(result.value)
          .subscribe( () => this.cargarHospitales());
    });
}

actualizarImagen(hospital: Hospital) {
  // console.log(hospital);
    this._modalUploadService.mostarModal('hospitales', hospital._id);
   //pero tenemos que notificar en el componente con el event
}
}
