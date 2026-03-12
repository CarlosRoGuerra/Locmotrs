import "./DashboardAdmin.css";

export default function DashboardAdmin() {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <div className="admin-logo-badge">LM</div>
          <div>
            <h2>LocMoto</h2>
            <p>Painel Admin</p>
          </div>
        </div>

        <nav className="admin-menu">
          <a href="#">Dashboard</a>
          <a href="#">Clientes</a>
          <a href="#">Veículos</a>
          <a href="#">Contratos</a>
          <a href="#">Financeiro</a>
          <a href="#">Relatórios</a>
          <a href="/">Sair</a>
        </nav>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div>
            <h1>Dashboard Administrativo</h1>
            <p>Visão geral da operação da LocMoto Brasil</p>
          </div>

          <div className="admin-user">
            <span>Administrador</span>
          </div>
        </header>

        <section className="admin-cards">
          <div className="admin-card">
            <h3>Clientes Ativos</h3>
            <strong>248</strong>
            <p>Base atual cadastrada na plataforma</p>
          </div>

          <div className="admin-card">
            <h3>Veículos Disponíveis</h3>
            <strong>89</strong>
            <p>Unidades prontas para operação</p>
          </div>

          <div className="admin-card">
            <h3>Contratos Ativos</h3>
            <strong>132</strong>
            <p>Contratos em andamento no sistema</p>
          </div>

          <div className="admin-card">
            <h3>Recebimentos do Mês</h3>
            <strong>R$ 84.500</strong>
            <p>Volume consolidado até o momento</p>
          </div>
        </section>

        <section className="admin-panels">
          <div className="panel">
            <h3>Resumo Operacional</h3>
            <p>
              Aqui você poderá exibir indicadores, status de contratos,
              pendências, veículos em manutenção e visão financeira resumida.
            </p>
          </div>

          <div className="panel">
            <h3>Últimas Atualizações</h3>
            <ul>
              <li>3 novos contratos cadastrados hoje</li>
              <li>2 veículos entraram em manutenção</li>
              <li>5 pagamentos foram confirmados</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}