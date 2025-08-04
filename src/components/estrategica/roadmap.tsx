interface RoadmapItem {
    title: string;
    quarter: string;
    color: string;
}

interface RoadmapLine {
    year: number;
    label: string;
    color: string;
    items: {
        group: RoadmapItem[];
    }[];
}

interface RoadmapProps {
    data: RoadmapLine[];
}

const bgColorMap = {
    blue: "bg-blue-50 text-blue-700",
    green: "bg-green-50 text-green-800",
    purple: "bg-purple-50 text-purple-700",
};

export function StrategicRoadmap({ data }: RoadmapProps) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-8 transition-transform duration-300 ease-out hover:-translate-y-2 ">
            {data.map((line, idx) => (
                <div key={idx}>
                    <div className="flex gap-4 ">
                        {/* Year */}
                        <div className="flex flex-col items-center justify-between pt-2">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm`} style={{ backgroundColor: line.color }}>
                                {line.year}
                            </div>
                        </div>

                        <div className="flex flex-col w-full space-y-2">
                            <h3 className="font-semibold text-gray-800">{line.label}</h3>
                            <div className="flex flex-wrap justify-between min-w-full">
                                {line.items.map((group, gIdx) => (
                                    group.group.map((item, itemIdx) => (
                                        <div
                                            key={`${gIdx}-${itemIdx}`}
                                            className={`rounded-md px-4 py-3 text-sm font-medium shadow-sm ${bgColorMap[item.color as keyof typeof bgColorMap]} min-w-[350px] `}
                                        >
                                            <p className="font-semibold">{item.title}</p>
                                            <p className="text-xs opacity-70">{item.quarter}</p>
                                        </div>
                                    ))
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
