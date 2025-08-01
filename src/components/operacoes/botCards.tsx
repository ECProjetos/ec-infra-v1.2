import { Card, CardHeader } from "../ui/card"
import { Clock, Loader, CheckCircle, BarChart } from "lucide-react"

interface OperationTimeData {
    soja: number
    milho: number
    acucar: number
    metas: {
        soja: number
        milho: number
        acucar: number
    }
    comparativo: string
}

interface OperationTimeCardProps {
    data: OperationTimeData
}

export function OperationTimeCard({ data }: OperationTimeCardProps) {
    return (
        <Card className="p-4 transition-transform duration-300 ease-out hover:-translate-y-2">
            <CardHeader className="flex items-center gap-2 text-blue-600 text-md font-semibold">
                <Clock className="w-4 h-4" />
                Tempo Médio de Operação
            </CardHeader>
            <div className="text-sm text-gray-800">
                <p>Média anual por carga vs meta</p>
                <ul className="mt-2 space-y-1">
                    <li>Soja: <span className={data.soja <= data.metas.soja ? "text-green-600" : "text-red-600"}>{data.soja}h</span> <span className="text-gray-500">(meta: {data.metas.soja}h)</span></li>
                    <li>Milho: <span className={data.milho <= data.metas.milho ? "text-green-600" : "text-red-600"}>{data.milho}h</span> <span className="text-gray-500">(meta: {data.metas.milho}h)</span></li>
                    <li>Açúcar: <span className={data.acucar <= data.metas.acucar ? "text-green-600" : "text-red-600"}>{data.acucar}h</span> <span className="text-gray-500">(meta: {data.metas.acucar}h)</span></li>
                </ul>
                <p className="text-green-600 text-xs mt-2">↗ {data.comparativo}</p>
            </div>
        </Card>
    )
}

interface LoadingRateData {
    soja: number
    milho: number
    acucar: number
    metas: {
        soja: number
        milho: number
        acucar: number
    }
    observacao: string
}

interface LoadingRateCardProps {
    data: LoadingRateData
}

export function LoadingRateCard({ data }: LoadingRateCardProps) {
    return (
        <Card className="p-4 transition-transform duration-300 ease-out hover:-translate-y-2">
            <CardHeader className="flex items-center gap-2 text-green-600 text-md font-semibold">
                <Loader className="w-4 h-4" />
                Taxa de Carregamento
            </CardHeader>
            <div className="text-sm text-gray-800">
                <p>Média anual por carga vs meta</p>
                <ul className="mt-2 space-y-1">
                    <li>Soja: <span className={data.soja >= data.metas.soja ? "text-green-600" : "text-red-600"}>{data.soja} t/h</span> <span className="text-gray-500">(meta: {data.metas.soja} t/h)</span></li>
                    <li>Milho: <span className={data.milho >= data.metas.milho ? "text-green-600" : "text-red-600"}>{data.milho} t/h</span> <span className="text-gray-500">(meta: {data.metas.milho} t/h)</span></li>
                    <li>Açúcar: <span className={data.acucar >= data.metas.acucar ? "text-green-600" : "text-red-600"}>{data.acucar} t/h</span> <span className="text-gray-500">(meta: {data.metas.acucar} t/h)</span></li>
                </ul>
                <p className="text-green-600 text-xs mt-2">↗ {data.observacao}</p>
            </div>
        </Card>
    )
}

interface OccupancyRateData {
    berco1: number
    berco2: number
    metas: {
        berco1: number
        berco2: number
    }
    resumo: string
}

interface OccupancyRateCardProps {
    data: OccupancyRateData
}

export function OccupancyRateCard({ data }: OccupancyRateCardProps) {
    return (
        <Card className="p-4 transition-transform duration-300 ease-out hover:-translate-y-2">
            <CardHeader className="flex items-center gap-2 text-purple-600 text-md font-semibold">
                <CheckCircle className="w-4 h-4" />
                Taxa de Ocupação
            </CardHeader>
            <div className="text-sm text-gray-800">
                <p>Média anual por berço vs meta</p>
                <ul className="mt-2 space-y-1">
                    <li>Berço 1: <span className={data.berco1 >= data.metas.berco1 ? "text-green-600" : "text-red-600"}>{data.berco1}%</span> <span className="text-gray-500">(meta: {data.metas.berco1}%)</span></li>
                    <li>Berço 2: <span className={data.berco2 >= data.metas.berco2 ? "text-green-600" : "text-red-600"}>{data.berco2}%</span> <span className="text-gray-500">(meta: {data.metas.berco2}%)</span></li>
                </ul>
                <p className="text-yellow-600 text-xs mt-2">↗ {data.resumo}</p>
            </div>
        </Card>
    )
}

interface TotalMovedData {
    soja: number
    milho: number
    acucar: number
    metas: {
        soja: number
        milho: number
        acucar: number
        total: number
    }
    total: number
    variacao: string
}

interface TotalMovedCardProps {
    data: TotalMovedData
}

function formatK(value: number) {
    return value.toLocaleString("en-US") + "k"
}

export function TotalMovedCard({ data }: TotalMovedCardProps) {
    return (
        <Card className="p-4 transition-transform duration-300 ease-out hover:-translate-y-2">
            <CardHeader className="flex items-center gap-2 text-orange-600 text-md font-semibold">
                <BarChart className="w-4 h-4" />
                Total Movimentado
            </CardHeader>
            <div className="text-sm text-gray-800">
                <p>Acumulado anual por carga vs meta</p>
                <ul className="mt-2 space-y-1">
                    <li>Soja: <span className={data.soja >= data.metas.soja ? "text-green-600" : "text-red-600"}>{formatK(data.soja)} ton</span> <span className="text-gray-500">(meta: {formatK(data.metas.soja)})</span></li>
                    <li>Milho: <span className={data.milho >= data.metas.milho ? "text-green-600" : "text-red-600"}>{formatK(data.milho)} ton</span> <span className="text-gray-500">(meta: {formatK(data.metas.milho)})</span></li>
                    <li>Açúcar: <span className={data.acucar >= data.metas.acucar ? "text-green-600" : "text-red-600"}>{formatK(data.acucar)} ton</span> <span className="text-gray-500">(meta: {formatK(data.metas.acucar)})</span></li>
                </ul>
                <div className="mt-2 font-semibold text-md text-orange-700">
                    Total: {formatK(data.total)} ton <span className="text-gray-500">(meta: {formatK(data.metas.total)})</span>
                </div>
                <p className="text-yellow-600 text-xs mt-1">↗ {data.variacao}</p>
            </div>
        </Card>
    )
}