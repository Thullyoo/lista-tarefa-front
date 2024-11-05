import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, EventEmitter, inject, input, Output } from '@angular/core';

@Component({
  selector: 'app-form-editar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-editar.component.html',
  styleUrl: './form-editar.component.css'
})
export class FormEditarComponent {

  tarefa_id = input.required<number>();

  formService = inject(FormBuilder);

  @Output() close = new EventEmitter<void>();

  closeForm(){
    this.close.emit();
  }

  form = this.formService.group({
    nome: new FormControl<string>("", {validators: Validators.required, nonNullable: true}),
    custo: new FormControl<number>(0, {validators: Validators.required, nonNullable: true}),
    data: new FormControl<Date>(new Date, {validators: Validators.required, nonNullable: true})
  })

  editarTarefa() {
    
  }
      
}
