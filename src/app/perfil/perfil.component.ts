import { Component, OnInit,TemplateRef } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router,ActivatedRoute, ParamMap} from "@angular/router";
import { Observable } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {BackURL} from "../../../urls";

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

  titulo: String
  contenido: String

  showSuccess: boolean
  showError: boolean




  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private modalService: BsModalService) {}

  ngOnInit(): void {
    this.showSuccess = false;
    this.showError = false;


    const userId = this.route.snapshot.paramMap.get('userId');
    this.usuarioId=this.route.snapshot.paramMap.get('userId');

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

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  openModal2(template: TemplateRef<any>) {
    this.showSuccess=false
    this.showError=false
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
  }

  confirm(): void {
    this.deleteUser()
    this.modalRef?.hide();
  }

  confirmMsj(): void {
    this.createConvo()
  }

  decline(): void {
    this.modalRef?.hide();
  }

  deleteUser() {
    this.http.post(BackURL + '/users/delete',{userId:this.usuarioId}, {withCredentials: true} ).subscribe(
      (resp: any) => {
        console.log("Borrado")
      },
      (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    );
  }

  createConvo() {

    const newConvoData = { // Objeto convo enviado
      last_date: new Date(),
      titulo : this.titulo,
      participante_1: null,
      participante_2: null,
      mensajes: [{
        emisor: null,
        contenido: this.contenido,
        fecha_msj: new Date()
      }]
    };

    this.http.post(BackURL + '/users/id',{userId:this.usuarioId}).subscribe(
      (resp: any) => {
        console.log(resp);
        newConvoData.participante_1 = resp.username;
        this.http.post(BackURL + '/msj/create',newConvoData, {withCredentials: true} ).subscribe(
          (resp: any) => {
            this.showSuccess = true;
            setTimeout(() => {
              this.modalRef?.hide();
            }, 1000);
          },
          (error: HttpErrorResponse) => {
            this.showError = true;
            console.log(error.message)
          }
        );
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        this.showError = true;
        setTimeout(() => {
          this.modalRef?.hide();
        }, 1000);
      }
    );
  }


}
