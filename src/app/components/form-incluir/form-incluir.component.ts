import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output, output, input } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TarefaServiceService } from '../../services/tarefa-service.service';

@Component({
  selector: 'app-form-incluir',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-incluir.component.html',
  styleUrl: './form-incluir.component.css'
})
export class FormIncluirComponent {

  tarefaService = inject(TarefaServiceService);

  @Output() close = new EventEmitter<void>();

  formService = inject(FormBuilder);

  form = this.formService.group({
    nome: new FormControl<string>("", {validators: Validators.required, nonNullable: true}),
    custo: new FormControl<number>(0, {validators: Validators.required, nonNullable: true}),
    data: new FormControl<Date>(new Date, {validators: Validators.required, nonNullable: true})
  })

  closeForm(){
    this.close.emit();
  }

  incluirTarefa(e: SubmitEvent) {
    e.preventDefault();
    this.tarefaService.incluirTarefa({
      nome: this.form.controls.nome.value,
      custo: this.form.controls.custo.value,
      data_limite: this.form.controls.data.value,
    })
  } 
}
