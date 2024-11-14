import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, EventEmitter, inject, Input, input, Output, ViewChild, type AfterViewInit, type ElementRef, type OnInit } from '@angular/core';
import { TarefaServiceService } from '../../services/tarefa-service.service';
import type { Tarefa } from '../../type/tarefa-type';
import type { Data } from '@angular/router';

@Component({
  selector: 'app-form-editar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-editar.component.html',
  styleUrl: './form-editar.component.css'
})
export class FormEditarComponent implements AfterViewInit, OnInit{

  datalimite: string = ''; 

  ngOnInit(): void {
  
    const dataLimite = new Date(this.tarefa.data_limite);

    dataLimite.setDate(dataLimite.getDate() - 1);

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
    nome: new FormControl<String>("", {validators: Validators.required, nonNullable: true}),
    custo: new FormControl<number>(0, {validators: Validators.required, nonNullable: true}),
    data: new FormControl<Date | String>(new Date(), {validators: Validators.required, nonNullable: true})
  });
  

  editarTarefa() {

    let data: Date | String = this.form.controls.data.value;

    if(data == new Date){
      data = "";
    }

    let custo:number | null = this.form.controls.custo.value;

    if(custo < 0){
      custo = null;
    }
    let nome: String | null = this.form.controls.nome.value;

    if(nome == ""){
      nome = null;
    }

    this.tarefaService.editarTarefa(this.tarefa.id, {
      nome: nome,
      custo: custo,
      data_limite: data
    });
    
    
  }
   
}
