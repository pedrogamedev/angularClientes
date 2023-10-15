import { Component, OnInit } from '@angular/core';
import { Cliente } from '../models/cliente';
import { ClienteServiceService } from '../cliente-service.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})

//onInit -> ciclo de vida do componente, nesse caso eh implementado na inicializacao
export default class ClienteComponent implements OnInit {
  clientes: Cliente[] = [];
  formGroup: FormGroup;
  
  //injetando servico (DI)
  constructor(private service: ClienteServiceService,
  private formBuilder: FormBuilder){
    this.formGroup = formBuilder.group({
      nome:[''],
      cep: 2,
      cpfCnpj: 32,
      pagaCerto: false
    });
  }

  // quando inicializa, retorna a lista do service
  ngOnInit(): void {
    this.service.getClientes().subscribe(
    {
      next: clientes => this.clientes = clientes
    }
    )
  }

  save()
  {
    let cliente = this.formGroup.value;
    this.service.save(cliente).subscribe(
      {
        next: cliente =>{
          this.clientes.push(cliente);
          this.formGroup.reset();
        }
      }
    )
  }

  delete(cliente: Cliente)
  {
    this.service.delete(cliente).subscribe(
      {
        next:() =>
        {
          this.clientes = this.clientes.filter(c => c.id !== cliente.id)
        }
      }
    )
  }
}
