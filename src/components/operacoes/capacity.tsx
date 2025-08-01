import { Card, CardHeader } from "../ui/card"

interface CapacityCardType {
    carga: string
    qtd_max: number
    qtd_atual: number
}

interface CapacityCardProps {
    data: CapacityCardType[]
}

// Gera uma cor aleatória em Tailwind (pode customizar sua lista)
const barColors = [
    "bg-yellow-500",
    "bg-orange-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-red-500",
    "bg-purple-500",
    "bg-pink-500",
]

function randomizeBarColor() {
    const idx = Math.floor(Math.random() * barColors.length)
    return barColors[idx]
}

export function CapacityCard({ data }: CapacityCardProps) {
    const formatK = (value: number) =>
        (value / 1000)
            .toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })
        + "k"

    return (
        <Card className="p-6 transition-transform duration-300 ease-out hover:-translate-y-2 h-full overflow-y-auto" >
            <CardHeader className="text-2xl font-semibold">
                Capacidade de Armazenagem
            </CardHeader>

            <div className="flex flex-col gap-6 mt-3">
                {data.map((item, idx) => {
                    const percent = Math.round((item.qtd_atual / item.qtd_max) * 100)
                    const barColor = randomizeBarColor()

                    return (
                        <div key={idx} className="flex flex-col gap-1">
                            <div className="flex justify-between items-center text-sm font-medium">
                                <span>{item.carga}</span>
                                <span>{percent}%</span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full ${barColor}`}
                                    style={{ width: `${percent}%` }}
                                />
                            </div>
                            <div className="text-xs text-gray-500">
                                {formatK(item.qtd_atual)}/{formatK(item.qtd_max)} ton
                            </div>
                        </div>
                    )
                })}
            </div>
        </Card>
    )
}
