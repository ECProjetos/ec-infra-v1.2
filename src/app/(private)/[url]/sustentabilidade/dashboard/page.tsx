import {
    Leaf,
    Share2,
    ListTodo,
    AlertTriangle,
} from "lucide-react"
import { TopCards } from "@/components/sustentabilidade/dashboard/topCards"
import { DonutChart } from "@/components/charts/donutChart"
import { LineAreaChart } from "@/components/sustentabilidade/dashboard/lineChart"
import { AlertItem } from "@/components/sustentabilidade/dashboard/alerts"


const mockProgramStatus = [
    { name: "Conformes", value: 24 },
    { name: "Atenção", value: 2 },
    { name: "Críticos", value: 1 },
]

const mockAlerts = [
    {
        title: "Monitoramento de Ruído em Atraso",
        description: "PCA - Programa de Controle Ambiental",
        due: "Prazo vencido há 3 dias",
        status: "CRÍTICO",
        color: "red",
    },
    {
        title: "Relatório PQAA Pendente",
        description: "Programa de Qualidade das Águas",
        due: "Entrega em 2 dias",
        status: "ATENÇÃO",
        color: "yellow",
    },
]

const idaAntaqData = [
    { quarter: "Q1 2023", value: 8.1 },
    { quarter: "Q2 2023", value: 8.3 },
    { quarter: "Q3 2023", value: 8.0 },
    { quarter: "Q4 2023", value: 8.4 },
    { quarter: "Q1 2024", value: 8.5 },
    { quarter: "Q2 2024", value: 8.7 },
    { quarter: "Q3 2024", value: 8.8 },
];

export default function DashboardPage() {
    return (
        <div className="px-15 py-10 space-y-10">
            <div className="flex gap-4">
                <TopCards
                    title="IDA ANTAQ"
                    value="8.62"
                    subtitle="↑ +0.15 vs anterior"
                    icon={<Leaf className="text-green-600" />}
                    borderColor="border-green-500"
                    iconBgColor="bg-green-100"
                    textColor="text-green-700"
                    subtitleColor="text-green-500"
                />

                <TopCards
                    title="Programas Ativos"
                    value="2"
                    subtitle="✔ 1 conformes"
                    icon={<Share2 className="text-blue-600" />}
                    borderColor="border-blue-500"
                    iconBgColor="bg-blue-100"
                    textColor="text-blue-700"
                    subtitleColor="text-blue-500"
                />

                <TopCards
                    title="Medições Pendentes"
                    value="2"
                    subtitle="⏱ 1 atrasadas"
                    icon={<ListTodo className="text-yellow-600" />}
                    borderColor="border-yellow-400"
                    iconBgColor="bg-yellow-100"
                    textColor="text-yellow-700"
                    subtitleColor="text-red-500"
                />

                <TopCards
                    title="Alertas Críticos"
                    value="2"
                    subtitle="🔔 Ação imediata"
                    icon={<AlertTriangle className="text-red-600" />}
                    borderColor="border-red-500"
                    iconBgColor="bg-red-100"
                    textColor="text-red-700"
                    subtitleColor="text-red-500"
                />
            </div>
            <div className="gap-4 flex">
                <div className="w-1/2">
                    <LineAreaChart
                        data={idaAntaqData}
                        title="Evolução do IDA ANTAQ"
                        color="#10b981"       // green-500
                        areaColor="rgba(16, 185, 129, 0.1)"
                    />
                </div>
                <div className="w-1/2">
                    <DonutChart
                        data={mockProgramStatus}
                        title="Status dos Programas"
                        unit=""
                        colors={["#10b981", "#f59e0b", "#ef4444"]} // verde, laranja, vermelho
                        showTotal={false}
                    />
                </div>
            </div>
            <div className="bg-white rounded-lg shadow px-5 py-5">
                <h1 className="font-bold text-xl flex gap-3 mb-5 items-center">
                    <AlertTriangle className="text-red-600" /> Alertas Críticos
                </h1>
                <AlertItem data={mockAlerts} />
            </div>
        </div>
    )
}
