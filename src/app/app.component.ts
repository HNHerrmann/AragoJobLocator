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

export class UserC{
  email: String;
  selfilters: String[];
  username: String;
  _id: String;
}

export class MensajeC{
  titulo: String;
  participante_1: String;
  creadorID: String;
  participante_2: String;
  last_date: Date;
  mensajes: MensajeContentC[];
}

export class MensajeContentC{
  emisor: String;
  contenido: String;
  fecha_msj: Date;
}

export class StatOffersCount{
  _id: string;
  count: number;
}

