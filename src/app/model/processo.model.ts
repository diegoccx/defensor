export interface Processo {
  id: number;
  numero_processo: string;
  data_abertura: Date;
  status: 'Em andamento' | 'Finalizado' | 'Suspenso';
  descricao?: string;
  defensor_id: number;  // Referência ao defensor (presumivelmente será associado a um defensor)
}
