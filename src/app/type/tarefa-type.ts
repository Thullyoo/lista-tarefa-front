export interface Tarefa {
    id: number;          // Identificador da tarefa (chave primária)
    nome: string;       // Nome da tarefa
    custo: number;      // Custo (R$)
    dataLimite: Date;   // Data limite
    ordemApresentacao: number; // Ordem de apresentação (campo numérico, não repetido)
}
