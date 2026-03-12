import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import { loginAdmin } from "../../services/auth.service";

export default function LoginAdmin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    senha: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const data = await loginAdmin(form);

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("perfil", data.perfil);
      localStorage.setItem("nome", data.nome);
      localStorage.setItem("email", data.email);

      navigate("/admin/dashboard");
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Erro ao fazer login.");
      }
    }
  }

  return (
    <div className="auth-page admin-theme">
      <div className="auth-left">
        <div className="auth-brand">
          <div className="brand-badge">LM</div>
          <div>
            <h1>LocMoto Brasil</h1>
            <p>Painel Administrativo</p>
          </div>
        </div>

        <div className="auth-left-content">
          <span className="auth-tag">Acesso Restrito</span>
          <h2>Gerencie a operação com controle total da plataforma</h2>
          <p>
            Acesse o ambiente administrativo para controlar clientes,
            contratos, veículos, cobranças e informações estratégicas do sistema.
          </p>

          <ul className="auth-benefits">
            <li>Gestão completa da operação</li>
            <li>Controle de clientes e contratos</li>
            <li>Visão centralizada do sistema</li>
          </ul>
        </div>
      </div>

      <div className="auth-right">
        <form className="auth-card" onSubmit={handleSubmit}>
          <div className="auth-card-header">
            <h3>Login administrativo</h3>
            <p>Somente usuários autorizados</p>
          </div>

          <div className="form-group">
            <label>E-mail</label>
            <input
              type="email"
              name="email"
              placeholder="admin@locmoto.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              name="senha"
              placeholder="Digite sua senha"
              value={form.senha}
              onChange={handleChange}
              required
            />
          </div>

          <button className="auth-btn primary" type="submit">
            Entrar no painel
          </button>

          <div className="auth-links">
            <a href="#">Recuperar acesso</a>
            <Link to="/">Voltar para a Home</Link>
          </div>
        </form>
      </div>
    </div>
  );
}