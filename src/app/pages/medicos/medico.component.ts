import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/service.index';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/medico/medico.service';
import { Router , ActivatedRoute} from '@angular/router';
import { ModalUploadService } from '../../components/modal-uploads/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = []; //donde guardaremos la data del servicio
  medico: Medico =  new Medico('', '', '', '', '');
  hopital: Hospital = new Hospital('');
  constructor( public _hospitalService: HospitalService,
               public _medicoService: MedicoService,
              public router: Router,
              public activatedRouter: ActivatedRoute,
              public modalUploadService: ModalUploadService) {
                activatedRouter.params.subscribe( params => {
                  let id = params['id']; //porque en la ruta del backend pusimis id
                  if ( id !== 'nuevo') { //si el id es nuevo
                    this.cargaMedico(id);
                  }

                });
               }
//inyectamso el servico que tiene los hospitales
  ngOnInit() {
    this._hospitalService.cargarHospitales()
        .subscribe( hospitales => this.hospitales = hospitales);
  
          this.modalUploadService.notificacion
              .subscribe( resp => {
                // console.log(resp);
                this.medico.img = resp.medico.img;
              });
      } //nos subcribimos e igualamos la respuesta a la variable local para usarla en nuestro componente



  guardarMedico(f: NgForm) {
    console.log( f.valid);
    console.log(f.value);

    if ( f.invalid ) {
        return; //si el formulario no es valido entonse salte
    }

    this._medicoService.guadarMedico(this.medico)
         .subscribe(medico => {

          //  console.log(medico);
           this.medico._id = medico._id;
           this.router.navigate(['/medico' , medico._id]);
         });
  }
  cambiaHospital(id: string) {
    this._hospitalService.obtenerHospital(id)
        .subscribe( hospital => {
          // console.log(hospital);
          this.hopital = hospital;
        });
  }

  cargaMedico(id: string) {
    this._medicoService.cargaMedico(id)
        .subscribe( medico => {
          console.log(medico);
          this.medico = medico; //seteAMOS LOS FVALORES PARA QUE TENGA LOS UEVOS
          this.medico.hospital = medico.hospital._id; //SETIAMOS LA PROPIEDAD DEL OBJETO
          this.cambiaHospital(this.medico.hospital); //llammaos a la funcion para que cambien la imagen
        });
  }
  cambiarFotografia() {
    console.log('Si estas dando click');
     this.modalUploadService.mostarModal('medicos', this.medico._id);
  }
}
