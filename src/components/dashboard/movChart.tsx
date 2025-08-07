'use client'

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import { Card } from '../ui/card'

interface MovChartData {
  month: string,
  tano2: number,
  tano1: number,
  teuano2: number,
  teuano1: number,
}

interface MovChartProps {
  data: MovChartData[]
}



export function MovimentacaoChart({ data }: MovChartProps) {
  return (
    <>
      <Card className='transition-transform duration-300 ease-out hover:-translate-y-2 hover:shadow-xl'>
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
            <Line yAxisId="left" type="monotone" dataKey="tano2" stroke="#3b82f6" name="Toneladas 2024" />
            <Line yAxisId="left" type="monotone" dataKey="tano1" stroke="#93c5fd" name="Toneladas 2023" strokeDasharray="5 5" />
            <Line yAxisId="right" type="monotone" dataKey="teuano2" stroke="#10b981" name="TEU 2024" />
            <Line yAxisId="right" type="monotone" dataKey="teuano1" stroke="#6ee7b7" name="TEU 2023" strokeDasharray="5 5" />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </>
  )
}
