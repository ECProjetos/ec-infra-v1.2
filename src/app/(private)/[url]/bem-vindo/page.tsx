"use client";

import { useAtivoStore } from "@/stores/useAtivoStore";
import { usePermissionStore } from "@/stores/usePermissionStore";
import Link from "next/link";

type CardItem = {
    title: string;
    desc: string;
    icon: string;
    perm: string; // deve casar com value das permissões
};

const cards: CardItem[] = [
    { title: "Operações", desc: "Acompanhe indicadores operacionais e eficiência.", icon: "📦", perm: "operacoes" },
    { title: "Financeiro", desc: "Dashboards de receitas, custos e projeções.", icon: "💹", perm: "financeiro" },
    { title: "Mercado", desc: "Inteligência de mercado e benchmarks.", icon: "🌐", perm: "mercado" },
    { title: "Estratégia", desc: "Metas, OKRs e iniciativas-chave.", icon: "🧩", perm: "estrategica" },
    { title: "Infraestrutura", desc: "Patrimônio, manutenção e disponibilidade.", icon: "🏗️", perm: "infraestrutura" },
    { title: "Sustentabilidade", desc: "Programas, medições e IDA ANTAQ.", icon: "🌱", perm: "sustentabilidade/dashboard" },
];

export default function BemVindoPage() {
    const ativo = useAtivoStore((s) => s.ativo);
    const perms = usePermissionStore().permissions as string[]; // ex.: ["financeiro", "infraestrutura"]

    // filtra apenas os cards que o usuário tem permissão
    const allowedCards = cards.filter((card) => perms.includes(card.perm));

    return (
        <div className="relative min-h-[calc(100vh-5rem)] overflow-hidden">
            {/* BG decorativo */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute -top-24 -right-32 h-80 w-80 rounded-full bg-gradient-to-br from-blue-500/30 to-cyan-400/30 blur-3xl" />
                <div className="absolute -bottom-24 -left-32 h-80 w-80 rounded-full bg-gradient-to-tr from-emerald-400/30 to-lime-300/30 blur-3xl" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.08),transparent_60%)]" />
            </div>

            {/* CARD PRINCIPAL */}
            <div className="relative mt-10 mx-10 overflow-hidden rounded-2xl bg-white/70 p-7 shadow-xl ring-1 ring-black/5 backdrop-blur-md md:p-10">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />

                <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 md:text-4xl">
                    Bem-vindo ao portal <span className="text-blue-600">EC Infra</span>!
                </h1>

                <p className="mt-3 max-w-2xl text-base leading-relaxed text-zinc-600 md:text-lg">
                    Utilize o menu lateral para navegar entre os módulos de gestão e visualizar os dashboards de acompanhamento.
                </p>

                {/* STATUS DO ATIVO */}
                <div className="mt-6">
                    {ativo ? (
                        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-emerald-700 ring-1 ring-emerald-200">
                            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-sm">
                                Você está visualizando o ativo{" "}
                                <span className="font-semibold text-emerald-800">{ativo.name}</span>.
                            </span>
                        </div>
                    ) : (
                        <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-amber-700 ring-1 ring-amber-200">
                            <span className="inline-flex h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                            <span className="text-sm">Selecione um ativo para começar.</span>
                        </div>
                    )}
                </div>

                {/* GRID DE ATALHOS */}
                {allowedCards.length > 0 && (
                    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {allowedCards.map((card) => (
                            <Link key={card.perm} href={card.perm}>
                                <InfoCard {...card} />
                            </Link>
                        ))}
                    </div>
                )}


            </div>
        </div>
    );
}

function InfoCard({ title, desc, icon }: { title: string; desc: string; icon: string }) {
    return (
        <div className="group relative overflow-hidden rounded-xl border border-zinc-200/70 bg-white/80 p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-blue-500/0 via-blue-500/40 to-blue-500/0" />
            </div>
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 text-xl">
                {icon}
            </div>
            <h3 className="text-sm font-semibold text-zinc-900">{title}</h3>
            <p className="mt-1 text-sm text-zinc-600">{desc}</p>
        </div>
    );
}
