import { Tarefa } from './../../type/tarefa-type';
import { Component } from '@angular/core';
import { CardTarefaComponent } from '../../components/card-tarefa/card-tarefa.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardTarefaComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tarefa1: Tarefa = {
    nome: "tarefa1",
    id: 1,
    custo: 50.0,
    dataLimite: new Date(),
    ordemApresentacao: 1
  }
}
