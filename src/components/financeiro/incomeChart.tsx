'use client'

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
    CartesianGrid,
} from 'recharts'

interface TimeSeriesData {
    mes: string
    valor1: number
    valor2: number | null
}

interface TimeSeriesChartProps {
    data: TimeSeriesData[]
    labelY?: string
    unit?: string
    label1?: string
    label2?: string
    color1?: string
    color2?: string
}

export function TimeSeriesComparisonChart({
    data,
    unit = '',
    label1 = 'Série 1',
    label2 = 'Série 2',
    color1 = '#9CA3AF',
    color2 = '#059669',
}: TimeSeriesChartProps) {
    return (
        <div className="bg-white p-4 rounded-lg border shadow-sm transition-transform duration-300 ease-out hover:-translate-y-2">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Evolução da Receita (12 meses)
                <p className='text-sm text-gray-500 mb-2'>(em milhões de reais)</p>
            </h2>
            <ResponsiveContainer width="100%" height={300} className="p-4" >
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis tickFormatter={(value) => `${unit} ${value}M`}>
                    </YAxis>

                    <Tooltip formatter={(value: number) => `${unit} ${value}M`} />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="valor2"
                        name={label2}
                        stroke={color2}
                        strokeWidth={3}
                        dot={{ r: 6, strokeWidth: 2, stroke: "#fff", fill: color2 }}
                        connectNulls
                    />
                    <Line
                        type="monotone"
                        dataKey="valor1"
                        name={label1}
                        stroke={color1}
                        strokeDasharray="5 5"
                        strokeWidth={3}
                        dot={{ r: 4, fill: color1 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}
