'use client';

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';



interface IncomeChartData {
    name: string,
    value: number
}

interface IncomeChartProps {
    data: IncomeChartData[]
}

const COLORS = ['#fbbf24', '#f97316', '#3b82f6', '#8b5cf6'];


export function IncomeChart({ data }: IncomeChartProps) {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const renderCustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const total = data.reduce((acc, cur) => acc + cur.value, 0);
            const current = payload[0].value;
            const percentage = ((current / total) * 100).toFixed(1);
            return (
                <div style={{ background: '#fff', padding: '8px', border: '1px solid #ccc' }}>
                    <strong>{payload[0].name}</strong><br />
                    R$ {current.toFixed(1)}M ({percentage}%)
                </div>
            );
        }
        return null;
    };

    return (
        <div style={{ width: '100%', height: 340, position: 'relative' }}>
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
                            const safeValue = value ?? 0;
                            const percentage = ((safeValue / total) * 100).toFixed(1);
                            return `${percentage}%`;
                        }}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip content={renderCustomTooltip} />
                    <Legend verticalAlign="bottom" height={36} />
                </PieChart>
            </ResponsiveContainer>
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                pointerEvents: 'none',
            }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#374151' }}>R$ {total.toFixed(1)}M</div>
                <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>Total</div>
            </div>
        </div>
    );
}
