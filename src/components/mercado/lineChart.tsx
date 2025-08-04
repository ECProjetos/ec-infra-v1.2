// components/graficos/LineMultiChart.tsx
'use client'

import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import { Card } from '../ui/card'

interface Serie {
    key: string
    label: string
    color?: string
    strokeDasharray?: string
}

interface LineMultiChartProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any[]
    series: Serie[]
    xAxisKey?: string
    yAxisLabel?: string
    height?: number
    title?: string
}

export function LineChartPlot({
    data,
    series,
    xAxisKey,
    yAxisLabel = "Volume (mil ton)",
    height = 340,
    title
}: LineMultiChartProps) {
    return (
        <Card className="p-4">
            {title && <h3 className="text-lg font-semibold mb-2 px-2">{title}</h3>}
            <ResponsiveContainer width="100%" height={height}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={xAxisKey} />
                    <YAxis label={{ value: yAxisLabel, angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    {series.map((s, idx) => (
                        <Line
                            key={idx}
                            type="monotone"
                            dataKey={s.key}
                            stroke={s.color ?? "#8884d8"}
                            strokeDasharray={s.strokeDasharray}
                            dot={true}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </Card>
    )
}
