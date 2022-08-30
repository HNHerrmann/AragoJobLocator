import { Component, OnInit } from '@angular/core';
import {MensajeC, OfertaC} from "../app.component";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {last} from "rxjs/operators";
import {moment} from "ngx-bootstrap/chronos/testing/chain";
import {BackURL} from "../../../urls";

const FILTER_PAG_REGEX = /[^0-9]/g;

@Component({
  selector: 'app-perfil-conf',
  templateUrl: './perfil-conf.component.html',
  styleUrls: ['./perfil-conf.component.css']
})
export class PerfilConfComponent implements OnInit {
  extrafil = {
    universidad: false,
    ayuntamiento: false
  }
  locfil: string;

  listado : [MensajeC]
  listado_len : number;
  nores : boolean;
  page: number;
  pageSize: number;

  lastChecked: Date

  nombre: String;
  apellido: String;
  comentarioAdicional: String;
  nombrePlaceholder: String;
  apellidoPlaceholder: String;
  comentarioAdicionalPlaceholder: String;

  showFilterSuccess : boolean;
  showFilterError : boolean;
  showPerfilSuccess : boolean;
  showPerfilError : boolean;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.extrafil.ayuntamiento=false;
    this.extrafil.universidad=false;
    this.page=1;
    this.pageSize=10;

    this.lastChecked= new Date()

    this.nombre=null;
    this.apellido=null;
    this.comentarioAdicional=null;
    this.nombrePlaceholder="Nombre";
    this.apellidoPlaceholder="Apellido";
    this.comentarioAdicionalPlaceholder="Comentarios extra";

    this.showFilterSuccess=false;
    this.showFilterError=false;
    this.showPerfilSuccess=false;
    this.showPerfilError=false;


    this.http.get(BackURL + '/users/date',{withCredentials: true}).subscribe(
      (resp: any) => {
        console.log(resp);
        console.log(resp.length)
        if(resp.last_check!=null) {
          this.lastChecked = resp.last_check;
          console.log(resp.last_check)
          console.log(this.lastChecked)
        }
        });
    console.log(this.lastChecked)
    this.http.get(BackURL + '/msj/userId',{withCredentials: true}).subscribe(
      (resp: any) => {
        console.log(resp);
        resp.forEach(mensajes =>
        {
          mensajes.last_date=(new Date (mensajes.last_date).toISOString())
          console.log(mensajes.last_date)
          mensajes.mensajes.forEach(mensaje =>
            {
              mensaje.fecha_msj = new Date (mensaje.fecha_msj).toLocaleString();
            }
          );
          this.http.post(BackURL + '/users/name',{username:mensajes.participante_1}).subscribe(
              (resp: any) => {
                console.log(resp);
                mensajes.creadorID = resp.id;
              },
              (error: HttpErrorResponse) => {
                console.error(error);
              }
            );
        });
        this.listado = resp;
        this.listado_len = this.listado.length;
        console.log(this.listado_len)
        if(resp.length==0){this.nores=true;}
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      });

    this.http.get(BackURL + '/perfilConf/profile',{withCredentials: true}).subscribe(
      (resp: any) => {
        console.log(resp);
        console.log(resp.length)
        if(resp.length!=0) {
          let json = resp.profile
          if(json.nom!=null && json.nom!=""){this.nombrePlaceholder=json.nom}
          if(json.apellido!=null && json.apellido!=""){this.apellidoPlaceholder=json.apellido}
          if(json.adicional!=null && json.adicional!=""){this.comentarioAdicionalPlaceholder=json.adicional}
          console.log(json)
        }
      });
  }




  saveFilters() {
    console.log('In this.saveFilters()')
    let array
    array = [];
    if(this.extrafil.ayuntamiento){
      array.push("Ayuntamiento");
    }
    if(this.extrafil.universidad){
      array.push("Universidad");
    }
    switch (this.locfil) {
      case('Zaragoza'): {
        array.push("Zaragoza");
        break;
      }
      case('Huesca'): {
        array.push("Huesca");
        break;
      }
      case('Teruel'): {
        array.push("Teruel");
        break;
      }
      default: {
        break;
      }
    }
    console.log(array);
    if(array.length==0) {
    }
    else {
      this.http.post(BackURL + '/perfilConf/filters',array,{
        withCredentials:true
      }).subscribe(
        (resp: any) => {
          console.log(resp);
          this.showFilterSuccess = true;
          setTimeout(() => {
            this.showFilterSuccess = false;
          }, 2000);
        },
        (error: HttpErrorResponse) => {
          console.error(error);
          this.showFilterError = true;
          setTimeout(() => {
            this.showFilterError = false;
          }, 2000);
        });
    }

  }


  saveProfile() {
    console.log('In this.saveProfile()')
    let json
    json = {
      nom:'',
      apellido:'',
      adicional:''
    };
    if(this.nombre!=null){
      json.nom=this.nombre;
    }
    if(this.apellido!=null){
      json.apellido=this.apellido;
    }
    if(this.comentarioAdicional!=null){
      json.adicional=this.comentarioAdicional;
    }
    console.log(json);
    if(json.nom=='' && json.apellido=='' && json.adicional=='') {
    }
    else {
      this.http.post(BackURL + '/perfilConf/profile',json,{
        withCredentials:true
      }).subscribe(
        (resp: any) => {
          this.showPerfilSuccess = true;
          setTimeout(() => {
            this.showPerfilSuccess = false;
          }, 2000);
        },
        (error: HttpErrorResponse) => {
          console.error(error);
          this.showPerfilError = true;
          setTimeout(() => {
            this.showPerfilError = false;
          }, 2000);
        });
    }

  }

  selectPage(page: string) {
    this.page = parseInt(page, 10) || 1;
  }

  formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
  }

  alertar() {
    alert("test")
  }

  updateCheck() {
    let now = new Date()
    this.http.post(BackURL + '/perfilConf/date', {date:now},{
      withCredentials:true
    }).subscribe(
      (resp: any) => {
        console.log(resp);
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      });

  }

  isPrevious(lastChecked: Date, last_date: Date) {
    console.log(new Date (lastChecked).getTime())
    console.log(new Date (last_date).getTime())

    console.log(new Date (lastChecked))
    console.log(new Date (last_date))
    return new Date (lastChecked).getTime()<new Date (last_date).getTime()
  }

  swapDate(msjDate: Date){
    let number
    number = msjDate.getMonth()
    msjDate.setMonth(msjDate.getDate()-1)
    msjDate.setDate(number+1)
    return msjDate
  }

  transformDate(offerDate: string){
    let date = new Date()
    let parts = offerDate.split('T');
    //console.log(parts)
    let dayparts = parts[0].split('-');
    //console.log(dayparts)
    date.setDate(Number(dayparts[2]))
    date.setMonth(Number(dayparts[1])-1)
    date.setFullYear(Number(dayparts[0]))
    return date;

  }
}
