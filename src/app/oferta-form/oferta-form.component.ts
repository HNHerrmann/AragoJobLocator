import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";


@Component({
  selector: 'app-oferta-form',
  templateUrl: './oferta-form.component.html',
  styleUrls: ['./oferta-form.component.css']
})
export class OfertaFormComponent implements OnInit {

  tipo : string;
  denomincion : string; //O
  convocante : string; //Obligatorio
  url: string;
  f_inicioPresentacion: Date; //O
  f_finPresentacion: Date; //0
  contacto: string;
  titulo: string;
  plazas: number;

  tipoSelect = {
    libre: false,
    interna: false
  }

  showSuccess = false;
  showFFinError = false;
  showFInitError = false;
  showConvError = false;
  showDenomError = false;
  showPuestoError = false;
  showConvocanteError = false;
  showTipoError = false;




  constructor( private http: HttpClient, private router: Router ) { }

  ngOnInit(): void {
    this.tipo = '';
    this.denomincion = '';
    this.convocante = '';
    this.url = '';
    this.contacto = '';
    this.titulo = '';
    this.f_inicioPresentacion = null;
    this.f_finPresentacion = null;
    this.plazas = null;

    this.tipoSelect.libre=false;
    this.tipoSelect.interna=false;

    this.clean();

  }

  clean(){
    this.showSuccess = false;
    this.showFFinError = false;
    this.showFInitError = false;
    this.showConvError = false;
    this.showDenomError = false;
    this.showPuestoError = false;
    this.showConvocanteError = false;
    this.showTipoError = false;
  }

  createOferta() {
    this.clean();

    const ofertaData = { // Objeto oferta enviado
      fuente: null,
      f_publicacion: new Date().toISOString(),
      tipo: null,
      denominacion: this.denomincion,
      convocante: this.convocante,
      url: this.url,
      f_inicioPresentacion: this.f_inicioPresentacion,
      f_finPresentacion: this.f_finPresentacion,
      contacto: this.contacto,
      titulo : this.denomincion,
      plazas: this.plazas,
      filters: null,
      createdByUser: true
    };

    console.log(this.tipoSelect.interna)
    console.log(this.tipoSelect.libre)

    if(this.tipoSelect.libre && this.tipoSelect.interna){
      ofertaData.tipo='Libre+Interna';
    }
    else{
      if(!this.tipoSelect.libre && !this.tipoSelect.interna){
        //do nothing
      }
      else{
        if(this.tipoSelect.libre){ofertaData.tipo='Libre';}
        if(this.tipoSelect.interna){ofertaData.tipo='Interna';}
      }
    }

    this.http.post('http://localhost:3000' + '/listado/crearOferta', ofertaData,{withCredentials: true} ).subscribe(
      (resp: any) => {
        console.log('resp');
        console.log(resp);
        this.showSuccess = true;
      },
      (error: HttpErrorResponse) => {
        if (error.error == "Puesto nulo") {
          this.showPuestoError = true;
        }
        if (error.error == "Convocante nulo") {
          this.showConvocanteError = true;
        }
        if (error.error == "Tipo nulo") {
          this.showTipoError = true;
        }
        if (error.error == "Incio nulo") {
          this.showFInitError = true;
        }
        if (error.error == "Fin nulo") {
          this.showFFinError = true;
        }
      });

  }



}
