import { TopCards } from "@/components/dashboard/topCards"
import {
    Ship,
    DollarSign,
    Anchor,
    GaugeCircle,
} from "lucide-react"

import "animate.css";
import { MovimentacaoChart } from "@/components/dashboard/movChart";
import { ReceitaChart } from "@/components/dashboard/incChart";
import { EquipCard, ShipsCard, AlertsCard } from "@/components/dashboard/botCards";

export const mockEquipamentos = [
    { name: "Guindastes", status: "Operacional" },
    { name: "Esteiras", status: "Manutenção" },
    { name: "Silos", status: "Operacional" },
];


const alertsMock = [
    {
        type: "warning",
        title: "Manutenção programada",
        description: "Esteira 2 - Amanhã 06:00",
    },
    {
        type: "info",
        title: "Previsão meteorológica",
        description: "Chuva moderada - 14:00-18:00",
    },
    {
        type: "success",
        title: "Meta mensal",
        description: "87% concluída",
    },
];

const shipsMock = [
    {
        name: "MV Atlantic Star",
        eta: "16:30",
        cargo: "Soja",
        cargo_amount: 45000,
    },
    {
        name: "MV Ocean Pride",
        eta: "18:45",
        cargo: "Milho",
        cargo_amount: 32000,
    },
    {
        name: "MV Grain Master",
        eta: "Amanhã 08:00",
        cargo: "Soja",
        cargo_amount: 38500,
    },
];


const MovChartData = [
    { month: 'Jan', t2024: 85, t2023: 78, teu2024: 2.8, teu2023: 2.5 },
    { month: 'Fev', t2024: 92, t2023: 85, teu2024: 3.1, teu2023: 2.8 },
    { month: 'Mar', t2024: 108, t2023: 98, teu2024: 3.6, teu2023: 3.2 },
    { month: 'Abr', t2024: 125, t2023: 115, teu2024: 4.2, teu2023: 3.8 },
    { month: 'Mai', t2024: 142, t2023: 128, teu2024: 4.8, teu2023: 4.2 },
    { month: 'Jun', t2024: 138, t2023: 125, teu2024: 4.6, teu2023: 4.0 },
    { month: 'Jul', t2024: 95, t2023: 88, teu2024: 3.2, teu2023: 2.9 },
    { month: 'Ago', t2024: 112, t2023: 102, teu2024: 3.8, teu2023: 3.4 },
    { month: 'Set', t2024: 128, t2023: 118, teu2024: 4.3, teu2023: 3.9 },
    { month: 'Out', t2024: 115, t2023: 108, teu2024: 3.9, teu2023: 3.5 },
    { month: 'Nov', t2024: 89, t2023: 82, teu2024: 3.0, teu2023: 2.7 },
    { month: 'Dez', t2024: 76, t2023: 70, teu2024: 2.5, teu2023: 2.2 },
]

const topCardsMockData = [
    {
        title: "Movimentação Total",
        value: "1.2M ton",
        legend: "vs mês anterior",
        icon: <Ship className="w-5 h-5" />,
        iconBg: "bg-blue-100 text-blue-600",
        variation: { value: "+8.5%", type: "up" as const }
    },
    {
        title: "Receita",
        value: "R$ 45.2M",
        legend: "vs mês anterior",
        icon: <DollarSign className="w-5 h-5" />,
        iconBg: "bg-green-100 text-green-600",
        variation: { value: "+12.3%", type: "up" as const }
    },
    {
        title: "Navios Atendidos",
        value: "47",
        legend: "vs mês anterior",
        icon: <Anchor className="w-5 h-5" />,
        iconBg: "bg-purple-100 text-purple-600",
        variation: { value: "+6", type: "up" as const }
    },
    {
        title: "Eficiência",
        value: "94.2%",
        legend: "vs mês anterior",
        icon: <GaugeCircle className="w-5 h-5" />,
        iconBg: "bg-orange-100 text-orange-600",
        variation: { value: "-1.2%", type: "down" as const }
    }
];

const IncomeData = [
    { name: 'Soja', value: 18.2 },
    { name: 'Milho', value: 12.8 },
    { name: 'Açúcar', value: 8.4 },
    { name: 'Outros', value: 5.8 },
];

export default function Dashboard() {
    return (
        <div className="px-15 py-10">
            <div className="flex gap-10 animate__animated animate__backInUp">
                <TopCards data={topCardsMockData} />
            </div>
            <div className="flex flex-row gap-6 mt-10 items-stretch animate__animated animate__backInUp animate__delay-2s">
                <div className="w-1/2 bg-white rounded-xl p-4 shadow-md">
                    <MovimentacaoChart data={MovChartData} />
                </div>
                <div className="w-1/2 bg-white rounded-xl p-4 shadow-md">
                    <ReceitaChart data={IncomeData} />
                </div>
            </div>
            <div className="flex gap-10 animate__animated animate__backInUp mt-10 animate__delay-3s">
                <div className="w-1/3">
                    <div className="rounded-xl h-[250px]">
                        <EquipCard data={mockEquipamentos} />
                    </div>
                </div>
                <div className="w-1/3">
                    <div className="rounded-xl h-[250px]">
                        <ShipsCard data={shipsMock} />
                    </div>
                </div>
                <div className="w-1/3">
                    <div className="rounded-xl h-[250px]">
                        <AlertsCard data={alertsMock} />
                    </div>
                </div>
            </div>
        </div>
    )
}