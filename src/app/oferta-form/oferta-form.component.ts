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

  showSuccess = false;
  showFFinError = false;
  showFInitError = false;
  showConvError = false;
  showDenomError = false;




  constructor( private http: HttpClient, private router: Router ) { }

  ngOnInit(): void {
    this.tipo = '';
    this.denomincion = '';
    this.convocante = '';
    this.url = '';
    this.contacto = '';
    this.titulo = '';
    this.f_inicioPresentacion = new Date();
    this.f_finPresentacion = new Date();;
    this.plazas = null;

    this.showSuccess = false;
    this.showFFinError = false;
    this.showFInitError = false;
    this.showConvError = false;
    this.showDenomError = false;

  }

  createOferta() {
    //this.clean();

    const ofertaData = { // Objeto usuario en registro
      algo: this.f_finPresentacion,
      otro: this.f_inicioPresentacion,
    };

    /*this.http.post('http://localhost:3000' + '/login', userData,{withCredentials: true} ).subscribe(
      (resp: any) => {
        console.log('resp');
        console.log(resp);
        console.log('logueado');
        this.showSuccess = true;
        setTimeout(() => {
          this.router.navigate(['inicio']);
        }, 1000);
      },
      (error: HttpErrorResponse) => {
        if (error.error == "Usuario no existe") {
          this.showNameError = true;
        }
        if (error.error == "Pass erronea") {
          this.showPassError = true;
        }
      });*/

  }

}
