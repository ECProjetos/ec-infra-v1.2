import { Card } from "../ui/card"
import { ReactNode } from "react"

interface TopCard {
    title: string
    value: string
    legend: string
    icon: ReactNode
    iconBg: string
    variation?: {
        value: string
        type: "up" | "down"
    }
}
interface TopCardProps {
    data: TopCard[]
}


export function TopCards({
    data
}: TopCardProps) {
    return (
        <>
            {data.map((card, idx) => {
                const isUp = card.variation?.type === "up";
                return (
                    <Card
                        key={idx}
                        className="rounded-xl px-9 py-4 shadow-sm border border-gray-200 w-full max-w-md transition-transform duration-300 ease-out hover:-translate-y-2 hover:shadow-xl"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex flex-col">
                                <h3 className="text-sm font-medium text-muted-foreground">{card.title}</h3>
                                <p className="text-3xl font-bold text-gray-900 mx-3 my-2">{card.value}</p>
                            </div>
                            <div className={`rounded-md p-2 ${card.iconBg}`}>{card.icon}</div>
                        </div>

                        {card.variation && (
                            <div className="mt-3 flex items-center gap-2 text-sm">
                                <span
                                    className={`flex items-center gap-1 font-medium ${isUp ? "text-green-600" : "text-red-600"
                                        }`}
                                >
                                    {isUp ? "▲" : "▼"} {card.variation.value}
                                </span>
                                <span className="text-muted-foreground">{card.legend}</span>
                            </div>
                        )}
                    </Card>
                );
            })}
        </>
    );
}
