import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DefensoresListComponent } from './defensores/defensores-list/defensores-list.component';
import { DefensorFormComponent } from './defensores/defensor-form/defensor-form.component';
import { ProcessosListComponent } from './processos/processos-list/processos-list.component';
import { ProcessoFormComponent } from './processos/processo-form/processo-form.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'defensores', component: DefensoresListComponent },
  { path: 'defensores/novo', component: DefensorFormComponent },
  { path: 'defensores/:id/editar', component: DefensorFormComponent },
  { path: 'processos', component: ProcessosListComponent },
  { path: 'processos/novo', component: ProcessoFormComponent },
  { path: 'processos/:id/editar', component: ProcessoFormComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
