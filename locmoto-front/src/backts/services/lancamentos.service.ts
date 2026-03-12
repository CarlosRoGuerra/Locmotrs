import { apiFetch } from "./api";
import { type LancamentoPayload } from "../types/lancamento";

export async function criarLancamento(payload: LancamentoPayload) {
  return apiFetch("/lancamentos", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}