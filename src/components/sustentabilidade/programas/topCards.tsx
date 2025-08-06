interface TopCardsType {
    title: string;
    value: number;
    subtitle: string;
    icon: React.ReactNode;
    color: string;
}

export function TopCards({ title, value, subtitle, icon, color }: TopCardsType) {
    return (

        <div className={`rounded-xl p-6 text-white bg-gradient-to-r ${color} shadow-md w-full`}>
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold">{title}</h3>
                <div className="text-2xl">{icon}</div>
            </div>
            <div className="text-3xl font-bold">{value}</div>
            <p className="mt-2 text-sm">{subtitle}</p>
        </div>
    );
}
