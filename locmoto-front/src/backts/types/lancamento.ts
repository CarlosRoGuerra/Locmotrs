export type TipoLancamento = "MANUTENCAO" | "DESPESA_DIVERSA";

export type LancamentoManutencaoPayload = {
  tipo_lancamento: "MANUTENCAO";
  data: string;
  veiculo_id: number;
  servico_prestado: string;
  km_atual: number;
  valor: number;
};

export type LancamentoDespesaPayload = {
  tipo_lancamento: "DESPESA_DIVERSA";
  data: string;
  veiculo_id?: number | null;
  descricao: string;
  valor: number;
};

export type LancamentoPayload =
  | LancamentoManutencaoPayload
  | LancamentoDespesaPayload;