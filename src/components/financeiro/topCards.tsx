import { JSX } from "react"

interface FinancialIndicator {
    label: string
    date: string
    value: string
    variation: string
    variationPositive: boolean
    icon: JSX.Element
    iconColor: string
}

interface FinancialCardProps {
    data: FinancialIndicator[]
}

export default function FinancialCard({ data }: FinancialCardProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
            {data.map((item, idx) => {
                const variationColor = item.variationPositive ? "text-green-600" : "text-red-600"

                return (
                    <div key={idx} className="p-4 rounded-lg bg-white shadow-sm border transition-transform duration-300 ease-out hover:-translate-y-2">
                        <div className="flex justify-between items-center text-md font-semibold text-gray-700">
                            <span>{item.label}</span>
                            <span className={`text-xl ${item.iconColor}`}>{item.icon}</span>
                        </div>
                        <div className="text-sm text-gray-500">{item.date}</div>
                        <div className="text-2xl font-bold text-gray-900 mt-1">{item.value}</div>
                        <div className={`text-xs mt-1 ${variationColor}`}>
                            {item.variationPositive ? "↗" : "↘"} {item.variation}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
