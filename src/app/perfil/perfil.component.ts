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

  titulo: String
  contenido: String

  showSuccess: boolean
  showError: boolean

  userNombre: String
  userApellido: String
  userComentario: String
  userFiltrosString: String

  noUser: boolean




  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private modalService: BsModalService) {}

  ngOnInit(): void {
    this.showSuccess = false;
    this.showError = false;

    this.userNombre = null;
    this.userApellido = null;
    this.userComentario = null;
    this.userFiltrosString = null;

    this.noUser = false;





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

    this.http.post('http://localhost:3000' + '/perfil/user', {userId:this.usuarioId}).subscribe(
      (resp: any) => {
        console.log(resp);
        if(resp.length!=0){
          let json = {}
          let filters = []
          if(resp.hasOwnProperty('perfil')){
            json = resp.perfil
            if(json.hasOwnProperty('nom')){this.userNombre=resp.perfil.nom}
            if(json.hasOwnProperty('apellido')){this.userApellido=resp.perfil.apellido}
            if(json.hasOwnProperty('adicional')){this.userComentario=resp.perfil.adicional}
          }
          if(resp.hasOwnProperty('filtros')){
            filters=resp.filtros
            for (let i = 0; i <filters.length ; i++) {
              if(i==0){
                this.userFiltrosString=resp.filtros[i]
              }
              else{
                this.userFiltrosString= this.userFiltrosString.concat(", ",resp.filtros[i])
              }
            }
          }
        }
        else{
          this.noUser=true
        }
      },
      (error: HttpErrorResponse) => {
        console.error(error);
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
    this.http.post('http://localhost:3000' + '/users/delete',{userId:this.usuarioId}, {withCredentials: true} ).subscribe(
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

    this.http.post('http://localhost:3000' + '/users/id',{userId:this.usuarioId}).subscribe(
      (resp: any) => {
        console.log(resp);
        newConvoData.participante_1 = resp.username;
        this.http.post('http://localhost:3000' + '/msj/create',newConvoData, {withCredentials: true} ).subscribe(
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
