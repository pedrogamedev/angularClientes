import { Component, OnInit } from '@angular/core';
import { Cliente } from '../models/cliente';
import { ClienteServiceService } from '../cliente-service.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})

//onInit -> ciclo de vida do componente, nesse caso eh implementado na inicializacao
export default class ClienteComponent implements OnInit {
  clientes: Cliente[] = [];
  
  //injetando servico (DI)
  constructor(private service: ClienteServiceService){}

  // quando inicializa, retorna a lista do service
  ngOnInit(): void {
    this.service.getClientes().subscribe(
    {
      next: clientes => this.clientes = clientes
    }
    )
  }

}
