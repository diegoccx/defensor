import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Processo } from '../model/processo.model';
import { ProcessoService } from '../services/processo5.service'; // Importando o serviço de processos
import { Router } from '@angular/router';

@Component({
  selector: 'app-processo',
  templateUrl: './processo.component.html',
  styleUrls: ['./processo.component.css']
})
export class ProcessoComponent implements OnInit {
  processoFormGroup!: UntypedFormGroup;
  processos: Processo[] = []; // Array para armazenar os processos
  isLoading = false; // Indicador de carregamento

  constructor(
    private fb: UntypedFormBuilder,
    private processoService: ProcessoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.processoFormGroup = this.fb.group({
      username: this.fb.control(null, [Validators.required, Validators.minLength(4)]),
      password: this.fb.control(null, [Validators.required, Validators.email])
    });

    // Carregar a lista de processos quando o componente é inicializado
   this.loadProcessos();
  }

  // Método para carregar os processos
  loadProcessos(): void {
    this.isLoading = true; // Inicia o carregamento
    this.processoService.getProcessos().subscribe(
      (data) => {
        this.processos = data; // Armazena os processos recebidos
		
        this.isLoading = false; // Finaliza o carregamento
      },
      (error) => {
        console.error('Erro ao carregar processos', error);
        this.isLoading = false; // Finaliza o carregamento em caso de erro
      }
    );
  }

  // Método para deletar um processo
  deleteProcesso(id: number): void {
    this.processoService.deleteProcesso(id).subscribe(
      () => {
        this.loadProcessos(); // Recarrega a lista de processos após a exclusão
      },
      (error) => {
        console.error('Erro ao excluir processo', error);
      }
    );
  }
}
