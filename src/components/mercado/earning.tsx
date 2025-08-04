'use client'

import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'
import { Card } from '../ui/card'

interface FaturamentoData {
    month: string
    value: number
}

interface FaturamentoChartProps {
    data: FaturamentoData[]
    barColor?: string
    yAxisLabel?: string
}

export function FaturamentoChart({
    data,
    barColor = '#10b981',              // verde-500 por padrão
    yAxisLabel = ''                    // pode ser "R$ mil" se quiser
}: FaturamentoChartProps) {
    return (
        <Card className="p-4">
            <h3 className="text-lg font-semibold mb-2 px-2">
                Previsão de Faturamento – Próximos Meses
            </h3>

            <ResponsiveContainer width="100%" height={340}>
                <BarChart
                    data={data}
                    margin={{ top: 20, right: 20, left: 20, bottom: 10 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis
                        label={
                            yAxisLabel
                                ? { value: yAxisLabel, angle: -90, position: 'insideLeft' }
                                : undefined
                        }
                    />
                    <Tooltip
                        formatter={(value: number) => [`R$ ${value.toFixed(2)} `, "Faturamento previsto (R$ em milhões)"]}
                    />
                    <Bar dataKey="value" fill={barColor} barSize={32} radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </Card>
    )
}
