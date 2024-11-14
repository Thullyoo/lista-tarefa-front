import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output, output, input, type OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TarefaServiceService } from '../../services/tarefa-service.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Directive, ElementRef, AfterViewInit } from '@angular/core';
import { C } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-form-incluir',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-incluir.component.html',
  styleUrl: './form-incluir.component.css'
})
export class FormIncluirComponent implements AfterViewInit{

  @ViewChild('inputnome') inputnome!: ElementRef;

  ngAfterViewInit(): void {
    this.inputnome.nativeElement.focus();
  }

  toast = inject(ToastrService);

  tarefaService = inject(TarefaServiceService);

  @Output() close = new EventEmitter<void>();

  formService = inject(FormBuilder);

  form = this.formService.group({
    nome: new FormControl<string>("", {validators: [Validators.required, Validators.minLength(5)], nonNullable: true}),
    custo: new FormControl<number>(0, {validators: [Validators.required, Validators.min(0), Validators.pattern(/^\d+([.,]\d+)?$/)], nonNullable: true}),
    data: new FormControl<Date>(new Date, {validators:[ Validators.required, Validators.min(new Date(new Date().getTime() + 24 * 60 * 60 * 1000).getTime())], nonNullable: true})
  })

  closeForm(){  
    this.close.emit();
  }

  incluirTarefa(e: SubmitEvent) {

    e.preventDefault();

    if (this.form.get('nome')?.errors?.['minlength']){
      this.toast.error("Nome precisa de pelo menos 5 caracteres");
      return
    }

    if (this.form.get('nome')?.errors?.['required']){
      this.toast.error("Nome é requerido");
      return
    }

    if (this.form.get('custo')?.errors?.['required']){
      this.toast.error("Custo é requerido");
      return
    }
    if (this.form.get('custo')?.errors?.['min']){
      this.toast.error("Custo não pode ser negativo");
      return
    }
    if (this.form.get('custo')?.errors?.['pattern']){
      this.toast.error("Custo é permitido apenas números");
      return
    }

    if (this.form.get('data_limite')?.errors?.['min']) {
      this.toast.error("Data limite não pode ser para hoje ou antes");
      return;
    }
    if (this.form.get('data_limite')?.errors?.['required']){
      this.toast.error("Data limite é requirido");
      return
    }

    this.tarefaService.incluirTarefa({
      nome: this.form.controls.nome.value ,
      custo: this.form.controls.custo.value,
      data_limite: this.form.controls.data.value,
    })
  } 


}

