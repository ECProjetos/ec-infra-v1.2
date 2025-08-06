import { TopCards } from "@/components/dashboard/topCards"
import {
    Ship,
    DollarSign,
    Anchor,
    GaugeCircle,
} from "lucide-react"

import "animate.css";
import { MovimentacaoChart } from "@/components/dashboard/movChart";
import { EquipCard, ShipsCard, AlertsCard } from "@/components/dashboard/botCards";
import { DonutChart } from "@/components/charts/donutChart";

const mockEquipamentos = [
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
    { month: 'Jan', tano2: 85, tano1: 78, teuano2: 2.8, teuano1: 2.5 },
    { month: 'Fev', tano2: 92, tano1: 85, teuano2: 3.1, teuano1: 2.8 },
    { month: 'Mar', tano2: 108, tano1: 98, teuano2: 3.6, teuano1: 3.2 },
    { month: 'Abr', tano2: 125, tano1: 115, teuano2: 4.2, teuano1: 3.8 },
    { month: 'Mai', tano2: 142, tano1: 128, teuano2: 4.8, teuano1: 4.2 },
    { month: 'Jun', tano2: 138, tano1: 125, teuano2: 4.6, teuano1: 4.0 },
    { month: 'Jul', tano2: 95, tano1: 88, teuano2: 3.2, teuano1: 2.9 },
    { month: 'Ago', tano2: 112, tano1: 102, teuano2: 3.8, teuano1: 3.4 },
    { month: 'Set', tano2: 128, tano1: 118, teuano2: 4.3, teuano1: 3.9 },
    { month: 'Out', tano2: 115, tano1: 108, teuano2: 3.9, teuano1: 3.5 },
    { month: 'Nov', tano2: 89, tano1: 82, teuano2: 3.0, teuano1: 2.7 },
    { month: 'Dez', tano2: 76, tano1: 70, teuano2: 2.5, teuano1: 2.2 },
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
            <div className="flex gap-10">
                <TopCards data={topCardsMockData} />
            </div>
            <div className="flex flex-row gap-6 mt-10">
                <div className="w-1/2 p-4 ">
                    <MovimentacaoChart data={MovChartData} />
                </div>
                <div className="w-1/2 p-4">
                    <DonutChart
                        title="Receita por Tipo de Carga"
                        data={IncomeData}
                        unit="R$"
                        showTotal={true} />

                </div>
            </div>
            <div className="flex gap-10">
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