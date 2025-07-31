'use client'

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'

interface MovChartData {
  month: string,
  t2024: number,
  t2023: number,
  teu2024: number,
  teu2023: number,
}

interface MovChartProps {
  data: MovChartData[]
}



export function MovimentacaoChart({ data }: MovChartProps) {
  return (

    <ResponsiveContainer width="100%" height={340} >
      <LineChart data={data} margin={{ top: 20, right: 40, left: 20, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis
          yAxisId="left"
          label={{ value: 'Toneladas (mil)', angle: -90, position: 'insideLeft' }}
        />
        <YAxis
          yAxisId="right" orientation="right"
          label={{ value: 'TEU (mil)', angle: -90, position: 'insideRight' }}
        />
        <Tooltip />
        <Legend />
        <Line yAxisId="left" type="monotone" dataKey="t2024" stroke="#3b82f6" name="Toneladas 2024" />
        <Line yAxisId="left" type="monotone" dataKey="t2023" stroke="#93c5fd" name="Toneladas 2023" strokeDasharray="5 5" />
        <Line yAxisId="right" type="monotone" dataKey="teu2024" stroke="#10b981" name="TEU 2024" />
        <Line yAxisId="right" type="monotone" dataKey="teu2023" stroke="#6ee7b7" name="TEU 2023" strokeDasharray="5 5" />
      </LineChart>
    </ResponsiveContainer>
  )
}
