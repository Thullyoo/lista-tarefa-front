import { Tarefa } from './../../type/tarefa-type';
import { Component } from '@angular/core';
import { CardTarefaComponent } from '../../components/card-tarefa/card-tarefa.component';
import {
  CdkDragDrop,
  moveItemInArray,
  CdkDropList,
  DragDropModule,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardTarefaComponent, CdkDropList, CommonModule, DragDropModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tarefa1: Tarefa = {
    nome: "Tarefa 1",
    id: 1,
    custo: 50.0,
    dataLimite: new Date('2024-11-30'), // Data limite específica
    ordemApresentacao: 1
};

tarefa2: Tarefa = {
    nome: "Tarefa 2",
    id: 2,
    custo: 75.0,
    dataLimite: new Date('2024-12-15'), // Data limite específica
    ordemApresentacao: 2
};

tarefa3: Tarefa = {
    nome: "Tarefa 3",
    id: 3,
    custo: 100.0,
    dataLimite: new Date('2024-12-31'), // Data limite específica
    ordemApresentacao: 3
};

tarefa4: Tarefa = {
    nome: "Tarefa 4",
    id: 4,
    custo: 25.0,
    dataLimite: new Date('2025-01-15'), // Data limite específica
    ordemApresentacao: 4
};
tarefas: Tarefa[] = [this.tarefa1, this.tarefa2, this.tarefa3, this.tarefa4];
  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.tarefas, event.previousIndex, event.currentIndex);
    
    this.tarefas.forEach((tarefa, index) => {
      tarefa.ordemApresentacao = index + 1;
    });
  }
}
