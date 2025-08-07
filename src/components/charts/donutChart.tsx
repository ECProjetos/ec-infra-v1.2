'use client'

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts'

interface DonutChartData {
    name: string
    value: number
}

interface DonutChartProps {
    data: DonutChartData[]
    title?: string
    unit?: string
    colors?: string[]
    showTotal?: boolean
    labelFormat?: (total: number) => string
}

const DEFAULT_COLORS = ['#ef4444', '#f97316', '#fbbf24', '#10b981', '#6366f1']

export function DonutChart({
    data,
    title = '',
    unit = '',
    colors = DEFAULT_COLORS,
    showTotal = true,
    labelFormat,
}: DonutChartProps) {
    const total = data.reduce((sum, item) => sum + item.value, 0)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const renderCustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const current = payload[0].value
            const percentage = ((current / total) * 100).toFixed(1)
            return (
                <div className="bg-white border border-gray-200 p-2 text-sm shadow-sm rounded-md ">
                    <strong>{payload[0].name}</strong>
                    <br />
                    {unit} {current.toFixed(1)} ({percentage}%)
                </div>
            )
        }
        return null
    }

    return (
        <div className="bg-white p-4 rounded-lg border shadow-sm transition-transform duration-300 ease-out hover:-translate-y-2 hover:shadow-xl">
            {title && (
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    {title}
                </h2>
            )}

            <div style={{ width: '100%', height: 300, position: 'relative' }}>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={3}
                            dataKey="value"
                            label={({ value }) => {
                                const safeValue = value ?? 0
                                const percentage = ((safeValue / total) * 100).toFixed(1)
                                return `${percentage}%`
                            }}
                        >
                            {data.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            ))}
                        </Pie>
                        <Tooltip content={renderCustomTooltip} />
                        <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                </ResponsiveContainer>

                {showTotal && (
                    <div className="absolute top-1/2 left-1/2 text-center pointer-events-none"
                        style={{ transform: 'translate(-50%, -50%)' }}>
                        <div className="text-lg font-bold text-gray-700">
                            {labelFormat ? labelFormat(total) : `${unit} ${total.toFixed(1)}`}
                        </div>
                        <div className="text-sm text-gray-500">Total</div>
                    </div>
                )}
            </div>
        </div>
    )
}
