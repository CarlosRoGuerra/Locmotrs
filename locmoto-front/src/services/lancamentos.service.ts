import { apiFetch } from "./api";

export async function criarLancamento(payload: any) {
  return apiFetch("/lancamentos", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}