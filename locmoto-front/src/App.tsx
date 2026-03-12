import { useState } from "react";
import { criarLancamento } from "./services/lancamentos.service";

export default function App() {
  const [tipo, setTipo] = useState<"MANUTENCAO" | "DESPESA_DIVERSA">("MANUTENCAO");
  const [data, setData] = useState("2026-03-06");
  const [veiculoId, setVeiculoId] = useState("1");
  const [valor, setValor] = useState("80");
  const [servico, setServico] = useState("Troca de óleo");
  const [kmAtual, setKmAtual] = useState("25000");
  const [descricao, setDescricao] = useState("Impressão de contrato");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const payload =
        tipo === "MANUTENCAO"
          ? {
              tipo_lancamento: "MANUTENCAO",
              data,
              veiculo_id: Number(veiculoId),
              servico_prestado: servico,
              km_atual: Number(kmAtual),
              valor: Number(valor),
            }
          : {
              tipo_lancamento: "DESPESA_DIVERSA",
              data,
              veiculo_id: veiculoId ? Number(veiculoId) : null,
              descricao,
              valor: Number(valor),
            };

      const res = await criarLancamento(payload);
      alert("Sucesso: " + JSON.stringify(res));
    } catch (error: any) {
      alert("Erro: " + error.message);
    }
  }

  return (
    <div style={{ padding: 30, maxWidth: 600 }}>
      <h1>Teste LocMoto Front</h1>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
        <select value={tipo} onChange={(e) => setTipo(e.target.value as any)}>
          <option value="MANUTENCAO">MANUTENCAO</option>
          <option value="DESPESA_DIVERSA">DESPESA_DIVERSA</option>
        </select>

        <input type="date" value={data} onChange={(e) => setData(e.target.value)} />
        <input
          placeholder="Veículo ID"
          value={veiculoId}
          onChange={(e) => setVeiculoId(e.target.value)}
        />
        <input
          placeholder="Valor"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />

        {tipo === "MANUTENCAO" ? (
          <>
            <input
              placeholder="Serviço prestado"
              value={servico}
              onChange={(e) => setServico(e.target.value)}
            />
            <input
              placeholder="KM atual"
              value={kmAtual}
              onChange={(e) => setKmAtual(e.target.value)}
            />
          </>
        ) : (
          <input
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        )}

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}