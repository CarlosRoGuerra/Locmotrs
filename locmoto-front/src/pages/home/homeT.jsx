import "./Home.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-page">
      <header className="hero">
        <nav className="navbar">
          <div className="logo-area">
            <div className="logo-badge">LM</div>
            <div>
              <h2>LocMoto Brasil</h2>
              <span>Gestão inteligente de locações e veículos</span>
            </div>
          </div>

          <div className="nav-actions">
            <Link href="/login-cliente" className="btn btn-outline">
              Área do Cliente
            </Link>
            <Link href="/login-admin" className="btn btn-primary">
              Login Administrativo
            </Link>
          </div>
        </nav>

        <div className="hero-content">
          <div className="hero-text">
            <span className="tag">Plataforma de Gestão</span>
            <h1>Controle completo para sua operação de locação</h1>
            <p>
              Gerencie contratos, clientes, veículos, pagamentos e processos
              operacionais em um único sistema, com mais organização, agilidade
              e visão do negócio.
            </p>

            <div className="hero-buttons">
              <a href="/login-cliente" className="btn btn-light">
                Entrar como Cliente
              </a>
              <a href="/login-admin" className="btn btn-dark">
                Entrar como Administrador
              </a>
            </div>
          </div>

          <div className="hero-card">
            <div className="card-header">
              <h3>Painel Operacional</h3>
              <span>Online</span>
            </div>

            <div className="card-metrics">
              <div className="metric">
                <strong>128</strong>
                <span>Veículos cadastrados</span>
              </div>
              <div className="metric">
                <strong>54</strong>
                <span>Contratos ativos</span>
              </div>
              <div className="metric">
                <strong>97%</strong>
                <span>Controle operacional</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="features">
          <div className="section-title">
            <span>Recursos</span>
            <h2>Uma plataforma feita para operação real</h2>
            <p>
              Tudo pensado para facilitar o dia a dia da gestão e melhorar o
              acompanhamento dos clientes.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="icon">🚗</div>
              <h3>Gestão de Veículos</h3>
              <p>
                Cadastro, acompanhamento, status e organização da frota em um
                só lugar.
              </p>
            </div>

            <div className="feature-card">
              <div className="icon">📄</div>
              <h3>Contratos e Documentos</h3>
              <p>
                Centralize contratos, anexos e informações importantes com
                acesso rápido.
              </p>
            </div>

            <div className="feature-card">
              <div className="icon">💰</div>
              <h3>Financeiro</h3>
              <p>
                Acompanhe cobranças, vencimentos e status de pagamentos com mais
                clareza.
              </p>
            </div>

            <div className="feature-card">
              <div className="icon">👤</div>
              <h3>Área do Cliente</h3>
              <p>
                Permita que o cliente consulte dados, contratos e informações do
                atendimento com facilidade.
              </p>
            </div>
          </div>
        </section>

        <section className="stats">
          <div className="stat-box">
            <h3>+ Organização</h3>
            <p>Processos centralizados e visual mais limpo para operação.</p>
          </div>
          <div className="stat-box">
            <h3>+ Controle</h3>
            <p>Informações importantes reunidas em uma única plataforma.</p>
          </div>
          <div className="stat-box">
            <h3>+ Agilidade</h3>
            <p>Mais rapidez no atendimento interno e no acesso do cliente.</p>
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-box">
            <h2>Escolha seu acesso</h2>
            <p>
              Entre no ambiente ideal para acompanhar informações ou administrar
              toda a operação.
            </p>

            <div className="cta-buttons">
              <a href="/login-cliente" className="btn btn-outline">
                Área do Cliente
              </a>

              <a href="/login-admin" className="btn btn-primary">
                Login Administrativo
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© 2026 LocMoto Brasil — Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}