import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router,ActivatedRoute, ParamMap} from "@angular/router";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  userId$: Observable<String>;
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    console.log(this.route.params)
    const userId = this.route.snapshot.paramMap.get('userId');
    console.log(this.route.snapshot.paramMap)
    console.log(userId)
  }

}
