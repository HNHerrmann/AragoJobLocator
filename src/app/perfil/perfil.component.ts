import { Component, OnInit,TemplateRef } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router,ActivatedRoute, ParamMap} from "@angular/router";
import { Observable } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  userId$: Observable<String>;
  usuarioId: String;
  modalRef?: BsModalRef;
  message?: string;

  islog : Boolean
  isAdmin : Boolean




  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private modalService: BsModalService) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('userId');
    this.usuarioId=this.route.snapshot.paramMap.get('userId');

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

  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.deleteUser()
    this.modalRef?.hide();
  }

  decline(): void {

    this.modalRef?.hide();
  }

  deleteUser() {
    this.http.post('http://localhost:3000' + '/users/delete',{userId:this.usuarioId}, {withCredentials: true} ).subscribe(
      (resp: any) => {
        console.log("Borrado")
      },
      (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    );

  }

}
