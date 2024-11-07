import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, EventEmitter, inject, Input, input, Output } from '@angular/core';
import { TarefaServiceService } from '../../services/tarefa-service.service';

@Component({
  selector: 'app-form-editar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-editar.component.html',
  styleUrl: './form-editar.component.css'
})
export class FormEditarComponent {

  @Input({ required: true }) tarefa_id!: number;

  formService = inject(FormBuilder);

  @Output() close = new EventEmitter<void>();

  tarefaService = inject(TarefaServiceService);

  closeForm(){
    this.close.emit();
  }

  form = this.formService.group({
    nome: new FormControl<string>("", {validators: Validators.required, nonNullable: true}),
    custo: new FormControl<number>(-1, {validators: Validators.required, nonNullable: true}),
    data: new FormControl<Date>(new Date, {validators: Validators.required, nonNullable: true})
  })

  editarTarefa() {

    let data: Date | null = this.form.controls.data.value;

    if(data == new Date){
      data = null;
    }

    let custo:number | null = this.form.controls.custo.value;

    if(custo < 0){
      custo = null;
    }
    let nome: string | null = this.form.controls.nome.value;

    if(nome == ""){
      nome = null;
    }

    this.tarefaService.editarTarefa(this.tarefa_id, {
      nome: nome,
      custo: custo,
      data_limite: data
    });
    
    
  }
      
}
