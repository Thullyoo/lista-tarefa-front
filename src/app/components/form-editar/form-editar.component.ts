import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, EventEmitter, inject, Input, input, Output, ViewChild, type AfterViewInit, type ElementRef, type OnInit } from '@angular/core';
import { TarefaServiceService } from '../../services/tarefa-service.service';
import type { Tarefa } from '../../type/tarefa-type';
import type { Data } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-editar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-editar.component.html',
  styleUrl: './form-editar.component.css'
})
export class FormEditarComponent implements AfterViewInit, OnInit{

  toast = inject(ToastrService)

  datalimite: string = ''; 

  ngOnInit(): void {
  
    const dataLimite = new Date(this.tarefa.data_limite);

    dataLimite.setDate(dataLimite.getDate());

    this.datalimite = dataLimite.toISOString().split('T')[0]; 

   
    this.form.patchValue({
      nome: this.tarefa.name,
      custo: this.tarefa.custo,
      data: this.datalimite
    });
  }

  

  @ViewChild('inputnome') inputnome! : ElementRef;

  ngAfterViewInit(): void {
    this.inputnome.nativeElement.focus();
  }
  
  @Input({ required: true }) tarefa!: Tarefa;

  @Output() close = new EventEmitter<void>();

  formService = inject(FormBuilder);

  tarefaService = inject(TarefaServiceService);

  closeForm(){
    this.close.emit();
  }

  form = this.formService.group({
    nome: new FormControl<String>("", {validators: [Validators.required, Validators.minLength(5)], nonNullable: true}),
    custo: new FormControl<number>(0, {validators: [Validators.required, Validators.min(0), Validators.pattern(/^\d+([.,]\d+)?$/)], nonNullable: true}),
    data: new FormControl<Date | String>(new Date(),{validators: [ Validators.required, Validators.min(new Date(new Date().getTime() + 24 * 60 * 60 * 1000).getTime())], nonNullable: true})
  });
  

  editarTarefa(e: SubmitEvent) {

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

    this.tarefaService.editarTarefa(this.tarefa.id, {
      nome: this.form.controls.nome.value ,
      custo: this.form.controls.custo.value,
      data_limite: this.form.controls.data.value,
    });
    
    
  }
   
}
