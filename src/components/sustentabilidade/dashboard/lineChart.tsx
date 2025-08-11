'use client'

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from 'recharts'

interface ChartPoint {
    mes: string
    value: number
}

interface LineAreaChartProps {
    data: ChartPoint[]
    title?: string
    color?: string
    areaColor?: string
}

export function LineAreaChart({
    data,
    title = '',
    color = '#10b981', // Tailwind green-500
}: LineAreaChartProps) {
    return (
        <div className="bg-white p-4 rounded-lg border shadow-sm">
            {title && (
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    {title}
                </h2>
            )}

            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="mes" />
                        <YAxis domain={[7, 10]} />
                        <Tooltip
                            contentStyle={{ fontSize: '0.875rem' }}
                            formatter={(value: number) => value.toFixed(2) + '%'}
                            labelStyle={{ fontWeight: 'bold' }}
                        />

                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke={color}
                            strokeWidth={3}
                            dot={{ r: 5 }}
                            activeDot={{ r: 7 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
