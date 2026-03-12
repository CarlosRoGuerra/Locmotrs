import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import DashboardPage from "../pages/dashboard/DashboardPage";
import VeiculosPage from "../pages/veiculos/VeiculosPage";
import ClientesPage from "../pages/clientes/ClientesPage";
import ContratosPage from "../pages/contratos/ContratosPage";
import FaturamentoPage from "../pages/faturamento/FaturamentoPage";
import LancamentosPage from "../pages/lancamentos/LancamentosPage";
import MultasPage from "../pages/multas/MultasPage";
import RelatoriosPage from "../pages/relatorios/RelatoriosPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "veiculos", element: <VeiculosPage /> },
      { path: "clientes", element: <ClientesPage /> },
      { path: "contratos", element: <ContratosPage /> },
      { path: "faturamento", element: <FaturamentoPage /> },
      { path: "lancamentos", element: <LancamentosPage /> },
      { path: "multas", element: <MultasPage /> },
      { path: "relatorios", element: <RelatoriosPage /> },
    ],
  },
]);