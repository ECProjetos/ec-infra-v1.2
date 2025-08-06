'use client';

import { CharCard } from "@/components/estrategica/characteristics";
import { ProjectCards } from "@/components/estrategica/iniciatives";
import { StrategicRoadmap } from "@/components/estrategica/roadmap";
import { Scorecard } from "@/components/estrategica/scoreCard";
import { TopCardsLayout } from "@/components/estrategica/topCards";

const topCardsData = [
    {
        titulo: "Crescimento de Receita",
        meta: 580_000_000,
        atual: 45_200_000,
        unidade: "R$"
    },
    {
        titulo: "Eficiência Operacional",
        meta: 96,
        atual: 94.2,
        unidade: "%"
    },
    {
        titulo: "Expansão de Capacidade",
        meta: 1_800_000,
        atual: 1_500_000,
        unidade: "ton/ano"
    }
];


const mockProjects = [
    {
        title: "Projeto Automação 4.0",
        status: "Em Andamento",
        progress: { value1: 35, value2: 100 },
        milestones: [
            { description: "Instalação sensores IoT - Fev/24" },
            { description: "Testes sistema integrado - Mar/24" },
            { description: "Go-live fase 1 - Abr/24" },
        ],
    },
    {
        title: "Expansão Berço 3",
        status: "Planejamento",
        progress: { value1: 15, value2: 100 },
        milestones: [
            { description: "Aprovação licenças - Mar/24" },
            { description: "Início obras civis - Jun/24" },
            { description: "Conclusão prevista - Dez/25" },
        ],
    },
];

const swotData = [
    {
        titulo: "Forças",
        tipo: "forca",
        items: [
            "Localização estratégica",
            "Eficiência operacional",
            "Relacionamento com clientes",
            "Equipe experiente",
            "Infraestrutura moderna"
        ]
    },
    {
        titulo: "Fraquezas",
        tipo: "fraqueza",
        items: [
            "Dependência de commodities",
            "Capacidade limitada",
            "Sazonalidade",
            "Custos de manutenção",
            "Automação parcial"
        ]
    },
    {
        titulo: "Oportunidades",
        tipo: "oportunidade",
        items: [
            "Crescimento do agronegócio",
            "Novos mercados asiáticos",
            "Tecnologia 4.0",
            "Parcerias estratégicas",
            "Sustentabilidade"
        ]
    },
    {
        titulo: "Ameaças",
        tipo: "ameaca",
        items: [
            "Novos concorrentes",
            "Regulamentações ambientais",
            "Volatilidade de preços",
            "Mudanças climáticas",
            "Instabilidade econômica"
        ]
    }
];


const scorecardData = [
    {
        title: "Perspectiva Financeira",
        metrics: [
            { name: "ROI", value: "24.8%", trend: "up" },
            { name: "Margem EBITDA", value: "41.4%", trend: "down" },
            { name: "Crescimento Receita", value: "+12.3%", trend: "up" },
        ],
    },
    {
        title: "Perspectiva do Cliente",
        metrics: [
            { name: "Satisfação do Cliente", value: "4.7/5", trend: "up" },
            { name: "Retenção de Clientes", value: "94%", trend: "up" },
            { name: "Novos Contratos", value: "3", trend: "up", color: "text-blue-600" },
        ],
    },
    {
        title: "Processos Internos",
        metrics: [
            { name: "Eficiência Operacional", value: "94.2%", trend: "down" },
            { name: "Tempo Médio Operação", value: "7.2h", trend: "up", color: "text-green-700" },
            { name: "Incidentes de Segurança", value: "0", trend: "stable" },
        ],
    },
    {
        title: "Aprendizado e Crescimento",
        metrics: [
            { name: "Satisfação Funcionários", value: "4.2/5", trend: "up" },
            { name: "Horas de Treinamento", value: "32h", trend: "up", color: "text-blue-600" },
            { name: "Turnover", value: "5.2%", trend: "down" },
        ],
    },
];

const roadmapData = [
    {
        year: 2024,
        label: "Consolidação e Eficiência",
        color: "#2563eb", // azul
        items: [
            {
                group: [
                    { title: "Automação Fase 1", quarter: "Q2–Q3", color: "blue" },
                    { title: "Certificação ISO 14001", quarter: "Q3", color: "green" },
                    { title: "Expansão Equipe TI", quarter: "Q1–Q2", color: "purple" },
                ],
            },
        ],
    },
    {
        year: 2025,
        label: "Expansão e Inovação",
        color: "#16a34a", // verde
        items: [
            {
                group: [
                    { title: "Berço 3 Operacional", quarter: "Q4", color: "blue" },
                    { title: "Automação Completa", quarter: "Q2–Q3", color: "green" },
                    { title: "Novos Mercados", quarter: "Q1–Q4", color: "purple" },
                ],
            },
        ],
    },
    {
        year: 2026,
        label: "Liderança e Sustentabilidade",
        color: "#9333ea", // roxo
        items: [
            {
                group: [
                    { title: "Hub Logístico Regional", quarter: "Q2–Q4", color: "blue" },
                    { title: "Carbono Neutro", quarter: "Q4", color: "green" },
                    { title: "Parcerias Estratégicas", quarter: "Q1–Q3", color: "purple" },
                ],
            },
        ],
    },
];


export default function PageEstrategica() {
    return (
        <div className="px-15 py-10">
            <h1 className="font-bold text-2xl">Gestão Estratégica</h1>
            <h2 className="font-semibold text-2xl mt-8">Objetivos Estratégicos 2024</h2>

            <div className="flex gap-10 max-w-full">
                <TopCardsLayout data={topCardsData} />
            </div>
            <h3 className="font-semibold text-2xl mt-8">Iniciativas Estratégicas</h3>
            <div className="flex flex gap-10 mt-8">
                <ProjectCards data={mockProjects} />
            </div>
            <h4 className="font-semibold text-2xl mt-8">Análise SWOT</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                {swotData.map((char, idx) => (
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    <CharCard key={idx} titulo={char.titulo} tipo={char.tipo as any} items={char.items} />
                ))}
            </div>

            <h5 className="font-bold text-xl mb-8 mt-8">Balanced Scorecard</h5>
            <Scorecard data={scorecardData} />

            <h6 className="font-bold text-xl mb-8 mt-8">Roadmap Estratégico 2024-2026</h6>
            <StrategicRoadmap data={roadmapData} />

        </div >
    )
}