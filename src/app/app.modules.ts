import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './auth/login/login.component';
import { DefensoresListComponent } from './defensores/defensores-list/defensores-list.component';
import { DefensorFormComponent } from './defensores/defensor-form/defensor-form.component';
import { ProcessosListComponent } from './processos/processos-list/processos-list.component';
import { ProcessoFormComponent } from './processos/processo-form/processo-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DefensoresListComponent,
    DefensorFormComponent,
    ProcessosListComponent,
    ProcessoFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
