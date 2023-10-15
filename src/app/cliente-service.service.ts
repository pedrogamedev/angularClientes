import { Injectable } from '@angular/core';
import { Cliente } from './models/cliente';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteServiceService {
  clientes: Cliente[] = [];
  baseURL: string = "http://localhost:4200/clientes";

  //inserindo itens na lista
  constructor(private http: HttpClient){
  }

  //retorna lista
  getClientes(): Observable<Cliente[]>
  {
    return this.http.get<Cliente[]>(this.baseURL);
  }
  save(cliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(this.baseURL, cliente);
  }
  delete(cliente: Cliente): Observable<void>{
    let url =`${this.baseURL}/${cliente.id}`
    return this.http.delete<void>(url);
  }
  
}
