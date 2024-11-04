export interface Tarefa {
    id: number;          // Identificador da tarefa (chave primária)
    name: String;       // Nome da tarefa
    custo: number;      // Custo (R$)
    data_limite: Date;   // Data limite
    ordem_apresentacao: number; // Ordem de apresentação (campo numérico, não repetido)
}