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
  isEditing: boolean = false;
  selectedCliente: Cliente = {} as Cliente;
  formGroup: FormGroup;
  
  //injetando servico (DI)
  constructor(private service: ClienteServiceService,
  private formBuilder: FormBuilder){
    this.formGroup = formBuilder.group({
      nome:[''],
      cep: undefined,
      cpfCnpj: undefined,
      pagaCerto: ['']
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
    if(this.isEditing)
    {
      //atualiza os dados do produto selecionado, esta no modo editing
      this.selectedCliente.nome = this.formGroup.get("nome")?.value;
      this.selectedCliente.cep = this.formGroup.get("cep")?.value;
      this.selectedCliente.pagaCerto = this.formGroup.get("pagaCerto")?.value;
      this.selectedCliente.cpfCnpj = this.formGroup.get("cpfCnpj")?.value;

      this.service.update(this.selectedCliente).subscribe({
        next:() =>{
          this.formGroup.reset();
          this.isEditing = false;
        }
      })
    }
    else
    {
      this.service.save(this.formGroup.value).subscribe(
      {
        next: cliente =>{
          this.clientes.push(cliente);
          this.formGroup.reset();
        }
      }
      )
    }
  }

  edit(cliente: Cliente)
  {
    this.selectedCliente = cliente;
    this.isEditing = true;
    this.formGroup.setValue({"nome": cliente.nome,"cep": cliente.cep,"cpfCnpj": cliente.cpfCnpj,"pagaCerto": cliente.pagaCerto})
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
    cancel() {
    this.formGroup.reset();
    this.isEditing = false;
  }
}
