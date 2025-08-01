import { CapacityCard } from "@/components/operacoes/capacity";
import { OnGoingCard } from "@/components/operacoes/onGoing";
import { ShipQueueCard } from "@/components/operacoes/shipQueue";

export const mockData = [
    {
        nome: "MV Atlantic Star",
        berco: "Berço 1",
        tipo_carga: "Carregamento de Soja",
        iniciado: "08:30",           // Usei string para facilitar o display
        previsao: "16:30",
        prancha: 1850,
        status: "Operando",
        carga_atual: 32_400,         // 32.4k
        carga_max: 45_000,           // 45k
    },
    {
        nome: "MV Grain Express",
        berco: "Berço 2",
        tipo_carga: "Carregamento de Milho",
        iniciado: "12:15",
        previsao: "20:00",
        prancha: 1620,
        status: "Interrompido",
        carga_atual: 18_700,         // 18.7k
        carga_max: 38_000,           // 38k
    }
];

export const mockDataCap = [
    { carga: "Soja", qtd_max: 150_000, qtd_atual: 127_500 },
    { carga: "Milho", qtd_max: 120_000, qtd_atual: 74_400 },
    { carga: "Açúcar", qtd_max: 80_000, qtd_atual: 27_200 },
    { carga: "Trigo", qtd_max: 90_000, qtd_atual: 55_300 },
    { carga: "Café", qtd_max: 40_000, qtd_atual: 13_700 },
]

export const shipQueueMock = [
    {
        navio: "MV Ocean Pride",
        tipo_carga: "Milho",
        quantidade: "32.000 ton",
        eta: "Hoje 18:45",
        berco: "Berço 1",
        status: "Aguardando"
    },
    {
        navio: "MV Grain Master",
        tipo_carga: "Soja",
        quantidade: "38.500 ton",
        eta: "Amanhã 08:00",
        berco: "Berço 2",
        status: "Programado"
    },
    {
        navio: "MV Cargo Star",
        tipo_carga: "Açúcar",
        quantidade: "25.000 ton",
        eta: "Amanhã 14:30",
        berco: "Berço 1",
        status: "Confirmando"
    },
]


export default function Operacoes() {
    return (
        <div className="px-15 py-10">
            <h1 className="text-2xl font-bold animate__animated animate__backInUp">Operações Portuárias</h1>
            <div className="flex gap-6 mt-6 animate__animated animate__backInUp">
                <div className="w-2/3 h-[450px]">
                    <OnGoingCard data={mockData} />
                </div>
                <div className="w-1/3 h-[450px]">
                    <CapacityCard data={mockDataCap} />
                </div>
            </div>
            <div className="mt-8 text-2xl font-bold animate__animated animate__backInUp animate__delay-1s">
                <ShipQueueCard data={shipQueueMock} />
            </div>
        </div>
    )
};