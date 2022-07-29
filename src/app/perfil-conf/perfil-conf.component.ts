import { Component, OnInit } from '@angular/core';
import {OfertaC} from "../app.component";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

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

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.extrafil.ayuntamiento=false;
    this.extrafil.universidad=false;
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
      this.http.post('http://localhost:3000' + '/perfilConf/filters',array,{
        withCredentials:true
      }).subscribe(
        (resp: any) => {
          console.log(resp);
        },
        (error: HttpErrorResponse) => {
          console.error(error);
        });
    }

  }

}
