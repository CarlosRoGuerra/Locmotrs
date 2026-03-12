import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginCliente } from "../../services/auth.service";
import "./Auth.css";

export default function LoginCliente() {
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
      const data = await loginCliente(form);

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("perfil", data.perfil);
      localStorage.setItem("nome", data.nome);
      localStorage.setItem("email", data.email);

      navigate("/cliente/painel");
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Erro ao fazer login.");
      }
    }
  }
  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-brand">
          <div className="brand-badge">LM</div>
          <div>
            <h1>LocMoto Brasil</h1>
            <p>Área do Cliente</p>
          </div>
        </div>

        <div className="auth-left-content">
          <span className="auth-tag">Acesso do Cliente</span>
          <h2>Consulte seus contratos, dados e informações com facilidade</h2>
          <p>
            Entre com seus dados para acessar sua área exclusiva e acompanhar
            tudo de forma rápida, organizada e segura.
          </p>

          <ul className="auth-benefits">
            <li>Consulta de contratos e informações</li>
            <li>Acompanhamento rápido do atendimento</li>
            <li>Ambiente seguro e organizado</li>
          </ul>
        </div>
      </div>

      <div className="auth-right">
        <form className="auth-card" onSubmit={handleSubmit}>
          <div className="auth-card-header">
            <h3>Entrar como cliente</h3>
            <p>Preencha seus dados para continuar</p>
          </div>

          <div className="form-group">
            <label>E-mail</label>
            <input
              type="email"
              name="email"
              placeholder="cliente@email.com"
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
            Acessar área do cliente
          </button>

          <div className="auth-links">
            <a href="#">Esqueci minha senha</a>
            <Link to="/">Voltar para a Home</Link>
          </div>
        </form>
      </div>
    </div>
  );
}