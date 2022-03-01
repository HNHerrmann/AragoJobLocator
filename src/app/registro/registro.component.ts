import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams, HttpResponse} from '@angular/common/http';
import {Router} from "@angular/router";


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  user : string;
  password : string;
  email : string;
  repepassword : string;
  showAlreadyExists : boolean;
  showOtherError : boolean;
  showSuccess : boolean;
  showPassError : boolean;
  showReqError : boolean;

  constructor( private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.user = '';
    this.password = '';
    this.email = '';
    this.repepassword = '';
    this.showAlreadyExists = false;
    this.showOtherError = false;
    this.showSuccess = false;
    this.showPassError = false;
    this.showReqError = false;
  }

  registrar() {
    this.clean();
    if(this.valid()) {
      const newUser = { // Objeto usuario en registro
        username: this.user,
        email: this.email,
        password: this.password,
        repepassword: this.repepassword
      };

      this.http.post('http://localhost:3000' + '/registro', newUser).subscribe(
        (resp: any) => { // comprobar estado: 201 recurso creado, 409 error por repetición de user
          console.log(resp);
          this.showSuccess = true;
          setTimeout(() => {
            this.router.navigate(['login']);
          }, 3000);
        },
        (error: HttpErrorResponse) => {
          if (error.error == "Ya existe") {
            this.showAlreadyExists = true;
          }
          if (error.error == "Algo ha ido mal") {
            this.showOtherError = true;
          }
        });
    }
  }

  clean(){
    this.showAlreadyExists = false;
    this.showOtherError = false;
    this.showSuccess = false;
    this.showSuccess = false;
    this.showPassError = false;
    this.showReqError = false;
  }

  valid(){
    if(this.password!=this.repepassword){
      this.showPassError=true;
      return false;
    }
    if(this.password=='' || this.repepassword=='' || this.user==''){
      this.showReqError=true;
      return false;
    }
    return true;
  }
}


