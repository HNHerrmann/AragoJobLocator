import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {BackURL} from "../../../urls";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user : string;
  password : string;
  showSuccess : boolean;
  showPassError : boolean;
  showNameError : boolean;

  constructor( private http: HttpClient, private router: Router ) { }

  ngOnInit(): void {
    this.user = '';
    this.password = '';
    this.showSuccess = false;
    this.showPassError = false;
    this.showNameError = false;
  }

  login() {
    this.clean();

      const userData = { // Objeto usuario en registro
        username: this.user,
        password: this.password,
      };

      this.http.post(BackURL + '/login', userData,{withCredentials: true} ).subscribe(
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
        });

  }

  clean(){
    this.showSuccess = false;
    this.showPassError = false;
    this.showNameError = false;
  }
}
