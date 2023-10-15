import { Injectable } from '@angular/core';
import { Cliente } from './models/cliente';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteServiceService {
  clientes: Cliente[] = [];
  
  //inserindo itens na lista
  constructor(private http: HttpClient){
  }

  //retorna lista
  getClientes(): Observable<Cliente[]>
  {
    return this.http.get<Cliente[]>("http://localhost:4200/clientes");
  }
}
