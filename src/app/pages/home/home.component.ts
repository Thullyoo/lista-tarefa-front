import { TarefaOrdem } from './../../type/tarefa-ordem-type';
import { Tarefa } from './../../type/tarefa-type';
import { Component, inject, type OnChanges, type OnInit, type SimpleChanges } from '@angular/core';
import { CardTarefaComponent } from '../../components/card-tarefa/card-tarefa.component';
import {
  CdkDragDrop,
  moveItemInArray,
  CdkDropList,
  DragDropModule,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { TarefaServiceService } from '../../services/tarefa-service.service';
import { FormIncluirComponent } from '../../components/form-incluir/form-incluir.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardTarefaComponent, CdkDropList, CommonModule, DragDropModule, FormIncluirComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent{
  

  displayForm = false; 

  toggleForm() {
    this.displayForm = !this.displayForm; 
  }

  closeForm() {
    this.displayForm = false; 
  } 

  tarefaService = inject(TarefaServiceService);

  tarefas: Tarefa[] = []

  ngOnInit(): void {
    this.tarefaService.listarTarefa().subscribe(
      {
        next: res => {
          this.tarefas = res.sort((a,b) =>  a.ordem_apresentacao - b.ordem_apresentacao );
        },
        error: err => {
          console.error(err);
        }
      }
    )
  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.tarefas, event.previousIndex, event.currentIndex);
    
    let listaOrdem: TarefaOrdem[] = [];
    
    this.tarefas.forEach((tarefa, index) => {
      tarefa.ordem_apresentacao = index + 1;
      listaOrdem.push({
        id: tarefa.id,
        ordem_apresentacao: index + 1
      })
    });
    this.tarefaService.editarOrdemTarefas(listaOrdem);
    console.log("finalizamos");
  }

 
}