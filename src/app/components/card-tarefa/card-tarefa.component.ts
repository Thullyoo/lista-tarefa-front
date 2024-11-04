import { Tarefa } from './../../type/tarefa-type';
import { Component, input, type InputSignal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-tarefa',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-tarefa.component.html',
  styleUrl: './card-tarefa.component.css'
})
export class CardTarefaComponent {

  public tarefa: InputSignal<Tarefa> = input.required<Tarefa>();

  formatDate(data: any): string {
    const dateObject = (data instanceof Date) ? data : new Date(data);
    return dateObject.toLocaleDateString("pt-BR", {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  }

}
