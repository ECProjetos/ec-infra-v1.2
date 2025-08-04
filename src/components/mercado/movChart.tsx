'use client'

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts'
import { Card } from '../ui/card'

interface CargaMovimentacaoChartProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: { [key: string]: any }[]; // [{ month: 'Jan', soja: 20, milho: 30 }]
    produtos: {
        key: string;       // chave no objeto de dados (ex: 'soja')
        label: string;     // nome para o tooltip/legenda (ex: 'Soja')
        color: string;     // cor da linha (ex: '#facc15')
    }[];
    yAxisLabel?: string; // opcional
}

export function CargaMovimentacaoChart({ data, produtos, yAxisLabel = "Volume (mil ton)" }: CargaMovimentacaoChartProps) {
    return (
        <Card className="p-4">
            <h3 className="text-lg font-semibold mb-2 px-2">Previsão de Movimentação – Próximos Meses</h3>
            <ResponsiveContainer width="100%" height={340}>
                <LineChart data={data} margin={{ top: 20, right: 40, left: 20, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis label={{ value: yAxisLabel, angle: -90, position: 'insideLeft' }} />
                    <Tooltip
                        formatter={(value: number) => [`${value.toFixed(2)} `, "(mil toneladas)"]}
                    />
                    <Legend />
                    {produtos.map((produto) => (
                        <Line
                            key={produto.key}
                            type="monotone"
                            dataKey={produto.key}
                            stroke={produto.color}
                            name={produto.label}
                            strokeWidth={3}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </Card>
    )
}
