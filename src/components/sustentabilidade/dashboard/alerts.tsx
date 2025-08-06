interface AlertItemData {
    title: string
    description: string
    due: string
    status: string,
    color: string,
}

interface AlertItemProps {
    data: AlertItemData[]
}


export function AlertItem({ data }: AlertItemProps) {
    return (
        <div className="space-y-3">
            {data.map((item, idx) => {
                const bgColor =
                    item.color === 'red'
                        ? 'bg-red-50 border-l-4 border-red-500'
                        : 'bg-orange-50 border-l-4 border-orange-500'

                const badgeColor =
                    item.color === 'red'
                        ? 'bg-red-200 text-red-800'
                        : 'bg-orange-200 text-orange-800'

                return (
                    <div
                        key={idx}
                        className={`rounded-md p-4 ${bgColor} relative`}
                    >
                        {/* Status badge */}
                        <span
                            className={`absolute top-3 right-3 text-xs font-semibold px-2 py-1 rounded-full ${badgeColor}`}
                        >
                            {item.status}
                        </span>

                        <div className="flex flex-col">
                            <h2 className="font-semibold text-red-800">{item.title}</h2>
                            <p className="text-sm text-gray-700">{item.description}</p>
                            <p className="text-sm mt-2 text-red-500">{item.due}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
