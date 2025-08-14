import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface TopCardProps {
    title: string
    value: string | number
    icon: ReactNode
    color: string
}

export function LicensaDashCards({
    title,
    value,
    icon,
    color,
}: TopCardProps) {
    return (
        <div
            className={cn(
                "flex justify-between items-center rounded-xl border-l-4 shadow-sm px-10 py-8 bg-white w-full",
            )}
        >
            <div className="space-y-3">
                <p className="text-sm text-gray-600">{title.toUpperCase()}</p>
                <h2 className={`text-4xl font-bold text-${color}-600`}>{value}</h2>
            </div>

            <div
                className={
                    `rounded-2xl flex items-center justify-center`}
            >
                {icon}
            </div>
        </div>
    )
}