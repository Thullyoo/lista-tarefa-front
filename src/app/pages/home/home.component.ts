import { Tarefa } from './../../type/tarefa-type';
import { Component, inject, type OnInit } from '@angular/core';
import { CardTarefaComponent } from '../../components/card-tarefa/card-tarefa.component';
import {
  CdkDragDrop,
  moveItemInArray,
  CdkDropList,
  DragDropModule,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { TarefaServiceService } from '../../services/tarefa-service.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardTarefaComponent, CdkDropList, CommonModule, DragDropModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit{
  
  tarefaService = inject(TarefaServiceService);

  tarefas: Tarefa[] = []

  ngOnInit(): void {
    this.tarefaService.getTarefa().subscribe(
      {
        next: res => {
          this.tarefas = res;
        },
        error: err =>{
          console.error(err);
        }
      }
    )
  }
  mostrarBtn: { [key: number]: boolean } = {};

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.tarefas, event.previousIndex, event.currentIndex);
    
    console.log(event.previousIndex)
    console.log(event.currentIndex)

    this.tarefas.forEach((tarefa, index) => {
      tarefa.ordem_apresentacao = index + 1;
    });
  }

  up(){
    
  }

  down(){

  }
}
