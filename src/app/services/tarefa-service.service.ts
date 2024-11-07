import { HttpClient } from '@angular/common/http';
import { inject, Injectable, type InputSignal } from '@angular/core';
import type { Tarefa } from '../type/tarefa-type';
import type { Observable } from 'rxjs';
import type { TarefaOrdem } from '../type/tarefa-ordem-type';
import type TarefaDTO from '../type/tarefa-dto-type';

@Injectable({
  providedIn: 'root'
})
export class TarefaServiceService {

  httpClient: HttpClient = inject(HttpClient);

  private url: string = "http://localhost:8080/tarefas";

  listarTarefa(): Observable<Tarefa[]>{
    return this.httpClient.get<Tarefa[]>(this.url);
  }
  
  editarOrdemTarefas(listOrdem: TarefaOrdem[]){
    const payload = { ordemList: listOrdem };
    this.httpClient.put<Tarefa[]>(this.url, payload).subscribe({
      next: (response) => console.log("Requisição bem-sucedida", response),
        error: (error) => console.error("Erro ao fazer a requisição", error)
    });
  }
  
  incluirTarefa(dto: TarefaDTO){
    this.httpClient.post(this.url, dto).subscribe({
      next: (response) => console.log("Requisição bem-sucedida", response),
        error: (error) => console.error("Erro ao fazer a requisição", error)
    });
  }

  excluirTarefa(tarefa_id: Number){
    this.httpClient.delete(this.url + `/${tarefa_id}`).subscribe({
      next: (response) => console.log("Requisição bem-sucedida", response),
        error: (error) => console.error("Erro ao fazer a requisição", error)
    });
  }

  editarTarefa(tarefa_id: Number, dto: TarefaDTO){
    this.httpClient.put(this.url + `/${tarefa_id}`, dto).subscribe({
      next: (response) => console.log("Requisição bem-sucedida", response),
        error: (error) => console.error("Erro ao fazer a requisição", error)
    });
  }
}
