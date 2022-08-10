import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ConversacionComponent} from './conversacion/conversacion.component';
import {GestionUsersComponent} from './gestion-users/gestion-users.component';
import {InicioComponent} from './inicio/inicio.component';
import {ListadoComponent} from './listado/listado.component';
import {LoginComponent} from './login/login.component';
import {OfertaFormComponent} from './oferta-form/oferta-form.component';
import {PerfilComponent} from './perfil/perfil.component';
import {PerfilConfComponent} from './perfil-conf/perfil-conf.component';
import {RegistroComponent} from './registro/registro.component';
import {StatsComponent} from './stats/stats.component';



const routes: Routes = [
  { path: 'conversacion', component: ConversacionComponent },
  { path: 'gestionUsers', component: GestionUsersComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'listado', component: ListadoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'oferta', component: OfertaFormComponent },
  { path: 'perfil/:userId', component: PerfilComponent },
  { path: 'perfilConf', component: PerfilConfComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'stats', component: StatsComponent },
  { path: '**', component: InicioComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
