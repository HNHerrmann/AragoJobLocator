import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'STWSept';
}

export class OfertaC{
  contacto: string;
  denominacion: string;
  convocante: string;
  creadorID: string;
  fuente: string;
  f_publicacion: Date;
  tipo: string;
  url: string;
  f_inicioPresentacion: Date;
  f_finPresentacion: Date;
  titulo: string;
  plazas: number;
  createdByUser: boolean;
}
