import { Component, OnInit } from '@angular/core';
import {OfertaC} from "../app.component";
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {newArray} from "@angular/compiler/src/util";

const FILTER_PAG_REGEX = /[^0-9]/g;

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  listado : [OfertaC]
  listado_len : number;
  nores : boolean;
  page: number;
  pageSize: number;
  extrafil = {
    universidad: false,
    ayuntamiento: false
  }
  locfil: string;

  islog : Boolean
  isAdmin : Boolean

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.isAdmin=false;
    this.http.get('http://localhost:3000' + '/login', {withCredentials: true} ).subscribe(
      (resp: any) => {
        if(resp.message=="Logueado"){
          this.islog=true;
        }
        else {
          if(resp.message=="AdminRight"){
            this.islog=true;
            this.isAdmin=true;
          }
          else{
            this.islog=false;
          }
        }
      });

    this.page=1;
    this.pageSize=10;
    this.extrafil.ayuntamiento=false;
    this.extrafil.universidad=false;
    this.listado_len=0;
    //this.locfil;
    this.nores=false;
    //this.getListado();
  }

  selectPage(page: string) {
    this.page = parseInt(page, 10) || 1;
  }

  formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
  }

  getListado() {
    let array
    array = [];
    this.nores=false;
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
    if(array.length==0) {
      this.http.get('http://localhost:3000' + '/listado').subscribe(
        (resp: any) => {
          //console.log(resp);
          this.listado = resp;
          resp.forEach(offer =>
          {
            offer.f_publicacion=this.transformDate(offer.f_publicacion).toLocaleDateString();
            offer.f_inicioPresentacion=this.transformDate(offer.f_inicioPresentacion).toLocaleDateString();
            offer.f_finPresentacion=this.transformDate(offer.f_finPresentacion).toLocaleDateString();
            if(offer.createdByUser){
              this.http.post('http://localhost:3000' + '/users/name',{username:offer.fuente}).subscribe(
                (resp: any) => {
                  console.log(resp.length)
                  if(resp.length!=0) {
                    offer.creadorID = resp.id;
                    console.log(resp.id);
                  }
                },
                (error: HttpErrorResponse) => {
                  console.error(error);
                }
              );
            }
          });
          this.listado_len = this.listado.length;
          if(resp.length==0){this.nores=true;}
        },
        (error: HttpErrorResponse) => {
          console.error(error);
        });
    }
    else {
      this.http.post('http://localhost:3000' + '/listado',array).subscribe(
        (resp: any) => {
          console.log(resp);
          this.listado = resp;
          resp.forEach(offer =>
          {
            offer.f_publicacion=this.transformDate(offer.f_publicacion).toLocaleDateString();
            offer.f_inicioPresentacion=this.transformDate(offer.f_inicioPresentacion).toLocaleDateString();
            offer.f_finPresentacion=this.transformDate(offer.f_finPresentacion).toLocaleDateString();
            if(offer.createdByUser){
              this.http.post('http://localhost:3000' + '/users/name',{username:offer.fuente}).subscribe(
                (resp: any) => {
                  console.log(resp.length)
                  if(resp.length!=0) {
                    offer.creadorID = resp.id;
                    console.log(resp.id);
                  }
                },
                (error: HttpErrorResponse) => {
                  console.log(error);
                  offer.creadorID = null;
                }
              );
            }
          });
          this.listado_len = this.listado.length;
          if(resp.length==0){this.nores=true;}
        },
        (error: HttpErrorResponse) => {
          console.error(error);
        });
    }

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

  getListadoOwnFilters() {
    this.http.get('http://localhost:3000' + '/users/filters',{withCredentials: true}).subscribe(
      (resp: any) => {
        console.log(resp);
        console.log(resp.length)
        this.extrafil.ayuntamiento=false;
        this.extrafil.universidad=false;
        this.locfil="No"
        if(resp.length!=0) {
          let array = []
          array=resp.filtros
          for (let i = 0; i < array.length; i++) {
            switch (array[i]) {
              case("Zaragoza"): {
                this.locfil = 'Zaragoza';
                break;
              }
              case("Huesca"): {
                this.locfil = 'Huesca';
                break;
              }
              case("Teruel"): {
                this.locfil = 'Teruel';
                break;
              }
              case("Ayuntamiento"): {
                this.extrafil.ayuntamiento = true;
                break;
              }
              case("Universidad"): {
                this.extrafil.universidad = true
                break;
              }
              default: {
                break;
              }
            }
          }
        }
        this.getListado()
      },
    (error: HttpErrorResponse) => {
      console.error(error);
    });

  }

}
