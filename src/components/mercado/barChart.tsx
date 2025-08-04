// components/graficos/GroupedBarChart.tsx
'use client'

import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import { Card } from '../ui/card'

interface Serie {
    key: string
    label: string
    color?: string
}

interface GroupedBarChartProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any[]
    series: Serie[]
    xAxisKey: string
    yAxisLabel?: string
    height?: number
    title?: string
}

export function GroupedBarChart({
    data,
    series,
    xAxisKey,
    yAxisLabel = "Volume (mil ton)",
    height = 340,
    title
}: GroupedBarChartProps) {
    return (
        <Card className="p-4 duration-300 ease-out hover:-translate-y-2">
            {title && <h3 className="text-lg font-semibold mb-2 px-2">{title}</h3>}
            <ResponsiveContainer width="100%" height={height}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={xAxisKey} />
                    <YAxis label={{ value: yAxisLabel, angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    {series.map((s, idx) => (
                        <Bar key={idx} dataKey={s.key} fill={s.color ?? "#8884d8"} barSize={30} />
                    ))}
                </BarChart>
            </ResponsiveContainer>
        </Card>
    )
}
