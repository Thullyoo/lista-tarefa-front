import { Tarefa } from './../../type/tarefa-type';
import { Component, input, type InputSignal, type OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormEditarComponent } from '../form-editar/form-editar.component';
import { FormExcluirComponent } from "../form-excluir/form-excluir.component";

@Component({
  selector: 'app-card-tarefa',
  standalone: true,
  imports: [CommonModule, FormEditarComponent, FormExcluirComponent],
  templateUrl: './card-tarefa.component.html',
  styleUrl: './card-tarefa.component.css'
})
export class CardTarefaComponent implements OnInit{

  public tarefa: InputSignal<Tarefa> = input.required<Tarefa>();
  
  tarefa_id: number = 0;

  ngOnInit(): void {
    this.tarefa_id = this.tarefa().id
  }


  displayFormExcluir = false;

  toggleFormExcluir(){
    this.displayFormExcluir = !this.displayFormExcluir;
  }

  closeFormExcluir(){
    this.displayFormExcluir = !this.displayFormExcluir;
  }

  displayFormEditar = false;


  toggleFormEditar(){
    this.displayFormEditar = !this.displayFormEditar;
  }

  closeFormEditar(){
    this.displayFormEditar = false;
  }


  formatDate(data: any): string {
    const dateObject = (data instanceof Date) ? data : new Date(data);
    return dateObject.toLocaleDateString("pt-BR", {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  }
  
}
