import React from "react";
import { Link } from "react-router-dom";
import { Bike, ShieldCheck, UserRound } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-10">
        <header className="flex items-center justify-between border-b border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-emerald-500/20 p-3 ring-1 ring-emerald-400/30">
              <Bike className="h-6 w-6 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-xl font-semibold tracking-wide">LocMoto Brasil</h1>
              <p className="text-sm text-slate-400">Gestão inteligente de locação de motocicletas</p>
            </div>
          </div>
        </header>

        <main className="flex flex-1 items-center py-12">
          <div className="grid w-full items-center gap-10 lg:grid-cols-2">
            <section className="space-y-6">
              <span className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-1 text-sm text-emerald-300">
                Plataforma de gestão LocMoto
              </span>

              <div className="space-y-4">
                <h2 className="text-4xl font-bold leading-tight md:text-5xl">
                  Controle sua operação de locação de motos em um só lugar.
                </h2>
                <p className="max-w-xl text-base leading-7 text-slate-300 md:text-lg">
                  Acesse o portal do cliente para acompanhar suas informações ou entre no painel
                  administrativo para gerenciar contratos, veículos, cobranças, multas e relatórios.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/login-cliente"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-6 py-4 text-base font-semibold text-slate-950 transition hover:bg-emerald-400"
                >
                  <UserRound className="h-5 w-5" />
                  Login do Cliente
                </Link>

                <Link
                  to="/login-admin"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-4 text-base font-semibold text-white transition hover:bg-white/10"
                >
                  <ShieldCheck className="h-5 w-5" />
                  Login Administrativo
                </Link>
              </div>
            </section>

            <section className="grid gap-4">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 backdrop-blur">
                <h3 className="text-lg font-semibold text-white">Área do Cliente</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Consulte contratos, acompanhe cobranças, visualize sua situação financeira e tenha
                  acesso rápido às informações da locação.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 backdrop-blur">
                <h3 className="text-lg font-semibold text-white">Painel Administrativo</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Gerencie veículos, clientes, contratos, faturamento semanal, multas, despesas e
                  relatórios operacionais com mais controle e menos trabalho manual.
                </p>
              </div>

              <div className="rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-6">
                <p className="text-sm leading-6 text-emerald-100">
                  Dica: se suas rotas tiverem outro nome, altere os links de
                  <span className="mx-1 font-semibold">/login-cliente</span>
                  e
                  <span className="mx-1 font-semibold">/login-admin</span>
                  para o padrão do seu projeto.
                </p>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
