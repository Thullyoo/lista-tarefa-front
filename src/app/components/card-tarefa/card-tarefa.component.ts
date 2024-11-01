import { Component, input } from '@angular/core';
import { Tarefa } from '../../type/tarefa-type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-tarefa',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-tarefa.component.html',
  styleUrl: './card-tarefa.component.css'
})
export class CardTarefaComponent {

  public tarefa = input.required<Tarefa>();
}
