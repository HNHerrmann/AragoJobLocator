import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {HttpClient, HttpErrorResponse, HttpParams, HttpResponse} from '@angular/common/http';
import {BackURL} from "../../../urls.js";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  islog : Boolean
  isAdmin : Boolean

  constructor(    private router : Router,
                  private http : HttpClient) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.isAdmin=false;
    this.http.get(BackURL + '/login', {withCredentials: true} ).subscribe(
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
  }

  toList() {
    this.router.navigate(['listado']);
  }

  toRegister() {
    this.router.navigate(['registro'],);
  }

  toLogin() {
    this.router.navigate(['login']);
  }

  toMiPerfil() {
    this.router.navigate(['perfilConf']);
  }

  toOferta() {
    this.router.navigate(['oferta']);
  }

  toStats() {
    this.router.navigate(['stats']);
  }

  toGestionUsers() {
    this.router.navigate(['gestionUsers']);
  }
}
