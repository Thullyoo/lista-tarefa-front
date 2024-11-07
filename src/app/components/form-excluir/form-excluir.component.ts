import { Component, EventEmitter, inject, Input, input, Output, type OnChanges, type SimpleChanges } from '@angular/core';
import { TarefaServiceService } from '../../services/tarefa-service.service';

@Component({
  selector: 'app-form-excluir',
  standalone: true,
  imports: [],
  templateUrl: './form-excluir.component.html',
  styleUrl: './form-excluir.component.css'
})
export class FormExcluirComponent{

  @Input({required: true}) tarefa_id!: number;
  
  tarefaService = inject(TarefaServiceService);


  @Output() close = new EventEmitter<void>();
  
  closeForm(){
    this.close.emit();
  }

  excluirTarefa(){
    if(this.tarefa_id != null && this.tarefa_id != undefined){
      this.tarefaService.excluirTarefa(this.tarefa_id);
    }

    this.closeForm();
  }

}
