import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../model/customer.model";
import { Processo } from '../model/processo.model';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProcessoService2 {
  constructor(private http:HttpClient) { }

   public getProcessos(): Observable<Processo[]> {
    return this.http.get<Processo[]>(`${environment.backendHost}/processos`);
  }
  // Método para buscar processos com base em um keyword
  public searchProcessos(keyword: string): Observable<Processo[]> {
    return this.http.get<Processo[]>(`${environment.backendHost}/processo/search?keyword=${keyword}`);
  }
  // Método para salvar um novo processo
  public saveProcesso(processo: Processo): Observable<Processo> {
    return this.http.post<Processo>(`${environment.backendHost}/processo`, processo);
  }
   // Método para deletar um processo
  public deleteProcesso(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.backendHost}/processo/${id}`);
  }
}
