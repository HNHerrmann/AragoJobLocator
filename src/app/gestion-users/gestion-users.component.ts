import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {OfertaC,UserC} from "../app.component";
import {BackURL} from "../../../urls.js"

const FILTER_PAG_REGEX = /[^0-9]/g;

@Component({
  selector: 'app-gestion-users',
  templateUrl: './gestion-users.component.html',
  styleUrls: ['./gestion-users.component.css']
})


export class GestionUsersComponent implements OnInit {

  user : string;
  users : [UserC]
  users_len : number;
  nores : boolean;
  page: number;
  pageSize: number;



  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.user = null;
    this.page=1;
    this.pageSize=10;
    this.users_len=0;
    this.nores=false;
  }

  getListUsers() {
    this.nores=false;
    if(this.user==null) {
      this.http.get(BackURL + '/users/getUsers').subscribe(
        (resp: any) => {
          //console.log(resp);
          this.users = resp;
          this.users_len = this.users.length;
          if(resp.length==0){this.nores=true;}
        },
        (error: HttpErrorResponse) => {
          console.error(error);
        });
    }
    else {
      this.http.post(BackURL + '/users/getUsers',{name:this.user}).subscribe(
        (resp: any) => {
          console.log(resp);
          this.users = resp;
          this.users_len = this.users.length;
          if(resp.length==0){this.nores=true;}
        },
        (error: HttpErrorResponse) => {
          console.error(error);
        });
    }

  }

  selectPage(page: string) {
    this.page = parseInt(page, 10) || 1;
  }

  formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
  }

}
