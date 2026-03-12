const API_BASE_URL = "http://127.0.0.1:8000";

export type LoginResponse = {
  access_token: string;
  token_type: string;
  perfil: string;
  nome: string;
  email: string;
};

export async function loginCliente(payload: { email: string; senha: string }): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/cliente/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Erro ao fazer login.");
  }

  return data;
}

export async function loginAdmin(payload: { email: string; senha: string }): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/admin/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Erro ao fazer login.");
  }

  return data;
}