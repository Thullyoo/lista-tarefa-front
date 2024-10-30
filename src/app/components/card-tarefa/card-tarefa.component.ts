import { Component, input } from '@angular/core';
import { Tarefa } from '../../type/tarefa-type';

@Component({
  selector: 'app-card-tarefa',
  standalone: true,
  imports: [],
  templateUrl: './card-tarefa.component.html',
  styleUrl: './card-tarefa.component.css'
})
export class CardTarefaComponent {

  public tarefa = input.required<Tarefa>();
}
