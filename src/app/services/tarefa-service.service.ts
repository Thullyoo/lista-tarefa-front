import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Tarefa } from '../type/tarefa-type';
import type { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarefaServiceService {

  httpClient: HttpClient = inject(HttpClient);

  private url: string = "http://localhost:8080/tarefas";

  getTarefa(): Observable<Tarefa[]>{
    return this.httpClient.get<Tarefa[]>(this.url);
  }
  
}
