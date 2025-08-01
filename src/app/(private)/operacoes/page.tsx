import { CapacityCard } from "@/components/operacoes/capacity"
import { OnGoingCard } from "@/components/operacoes/onGoing"
import { ShipQueueCard } from "@/components/operacoes/shipQueue"
import {
    OperationTimeCard,
    LoadingRateCard,
    OccupancyRateCard,
    TotalMovedCard,
} from "@/components/operacoes/botCards"


export const operationTimeMock = {
    soja: 6.8,
    milho: 7.4,
    acucar: 8.1,
    metas: {
        soja: 7.2,
        milho: 7.8,
        acucar: 8.0,
    },
    comparativo: "Melhorou 12min vs mês anterior",
}

export const loadingRateMock = {
    soja: 1920,
    milho: 1780,
    acucar: 1650,
    metas: {
        soja: 1800,
        milho: 1650,
        acucar: 1700,
    },
    observacao: "+5.2% média geral vs meta",
}

export const occupancyRateMock = {
    berco1: 96.8,
    berco2: 91.6,
    metas: {
        berco1: 95.0,
        berco2: 95.0,
    },
    resumo: "Berço 1 acima da meta, Berço 2 abaixo",
}

export const totalMovedMock = {
    soja: 742,
    milho: 356,
    acucar: 98,
    total: 1196,
    metas: {
        soja: 720,
        milho: 380,
        acucar: 110,
        total: 1210,
    },
    variacao: "+8.5% vs 2023, -1.2% vs meta anual",
}
const mockData = [
    {
        nome: "MV Atlantic Star",
        berco: "Berço 1",
        tipo_carga: "Carregamento de Soja",
        iniciado: "08:30",
        previsao: "16:30",
        prancha: 1850,
        status: "Operando",
        carga_atual: 32_400,
        carga_max: 45_000,
    },
    {
        nome: "MV Grain Express",
        berco: "Berço 2",
        tipo_carga: "Carregamento de Milho",
        iniciado: "12:15",
        previsao: "20:00",
        prancha: 1620,
        status: "Interrompido",
        carga_atual: 18_700,
        carga_max: 38_000,
    },
]

const mockDataCap = [
    { carga: "Soja", qtd_max: 150_000, qtd_atual: 127_500 },
    { carga: "Milho", qtd_max: 120_000, qtd_atual: 74_400 },
    { carga: "Açúcar", qtd_max: 80_000, qtd_atual: 27_200 },
    { carga: "Trigo", qtd_max: 90_000, qtd_atual: 55_300 },
    { carga: "Café", qtd_max: 40_000, qtd_atual: 13_700 },
]

const shipQueueMock = [
    {
        navio: "MV Ocean Pride",
        tipo_carga: "Milho",
        quantidade: "32.000 ton",
        eta: "Hoje 18:45",
        berco: "Berço 1",
        status: "Aguardando",
    },
    {
        navio: "MV Grain Master",
        tipo_carga: "Soja",
        quantidade: "38.500 ton",
        eta: "Amanhã 08:00",
        berco: "Berço 2",
        status: "Programado",
    },
    {
        navio: "MV Cargo Star",
        tipo_carga: "Açúcar",
        quantidade: "25.000 ton",
        eta: "Amanhã 14:30",
        berco: "Berço 1",
        status: "Confirmando",
    },
]

export default function Operacoes() {
    return (
        <div className="px-15 py-10 space-y-10">
            <h1 className="text-2xl font-bold animate__animated animate__backInUp">
                Operações Portuárias
            </h1>



            {/* Operações e Capacidade */}
            <div className="flex gap-6 animate__animated animate__backInUp animate__delay-1s">
                <div className="w-2/3 h-[450px]">
                    <OnGoingCard data={mockData} />
                </div>
                <div className="w-1/3 h-[450px]">
                    <CapacityCard data={mockDataCap} />
                </div>
            </div>

            {/* Fila de navios */}
            <div className="animate__animated animate__backInUp animate__delay-2s">
                <ShipQueueCard data={shipQueueMock} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate__animated animate__backInUp animate__delay-3s">
                <OperationTimeCard data={operationTimeMock} />
                <LoadingRateCard data={loadingRateMock} />
                <OccupancyRateCard data={occupancyRateMock} />
                <TotalMovedCard data={totalMovedMock} />
            </div>
        </div>
    )
}
