import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {HttpClient, HttpErrorResponse, HttpParams, HttpResponse} from '@angular/common/http';

import {request} from "express";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  islog : Boolean

  constructor(
    private router : Router,
    private http : HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get('http://localhost:3000' + '/login', {withCredentials: true} ).subscribe(
      (resp: any) => {
        if(resp.message=="Logueado" || resp.message=="AdminRight"){
          this.islog=true;
        }
        else{
          this.islog=false;
        }
      });
  }


  toRegister(){
    console.log('Enter toRegister');
    this.router.navigate(['registro']);
  }

  toLogin(){
    console.log('Enter toLogin');
    this.router.navigate(['login']);
  }

  toInicio() {
    console.log('Enter toInicio');
    this.router.navigate(['inicio']);
  }

  toLogout() {
      this.http.post('http://localhost:3000' + '/login/logout', {}, {
        withCredentials: true
      }).subscribe(() => {
        this.islog=false;
        this.router.navigate(['inicio']);
      });

  }

  toAccount() {
    this.router.navigate(['perfilConf']);
  }

  toList() {
    this.router.navigate(['listado']);
  }
}
