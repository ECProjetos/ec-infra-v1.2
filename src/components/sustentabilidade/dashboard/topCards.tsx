import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface TopCardProps {
    title: string
    value: string | number
    subtitle?: string
    icon: ReactNode
    borderColor?: string // ex: 'border-green-500'
    iconBgColor?: string // ex: 'bg-green-100'
    textColor?: string // ex: 'text-green-600'
    subtitleColor?: string // ex: 'text-green-500'
}

export function TopCards({
    title,
    value,
    subtitle,
    icon,
    borderColor = "border-gray-300",
    iconBgColor = "bg-gray-100",
    textColor = "text-black",
    subtitleColor = "text-gray-500",
}: TopCardProps) {
    return (
        <div
            className={cn(
                "flex justify-between items-center rounded-xl border-l-4 shadow-sm px-10 py-8 bg-white w-full",
                borderColor
            )}
        >
            <div>
                <p className="text-sm text-gray-600">{title.toUpperCase()}</p>
                <h2 className={cn("text-2xl font-bold", textColor)}>{value}</h2>
                {subtitle && <p className={cn("text-sm", subtitleColor)}>{subtitle}</p>}
            </div>

            <div
                className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center",
                    iconBgColor
                )}
            >
                {icon}
            </div>
        </div>
    )
}