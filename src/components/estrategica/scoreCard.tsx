interface Metric {
    name: string;
    value: string;
    trend: string;
    color?: string; // opcional: para azul, verde etc.
}

interface Perspective {
    title: string;
    metrics: Metric[];
}

interface ScorecardProps {
    data: Perspective[];
}

export function Scorecard({ data }: ScorecardProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.map((perspective, idx) => (
                <div
                    key={idx}
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 transition-transform duration-300 ease-out hover:-translate-y-2"
                >
                    <h2 className="text-md font-semibold text-gray-900 mb-4">
                        {perspective.title}
                    </h2>
                    <ul className="space-y-3">
                        {perspective.metrics.map((metric, i) => {
                            const trendIcon =
                                metric.trend === "up"
                                    ? "↑"
                                    : metric.trend === "down"
                                        ? "↓"
                                        : "✔";
                            const trendColor =
                                metric.trend === "up"
                                    ? "text-green-600"
                                    : metric.trend === "down"
                                        ? "text-red-600"
                                        : "text-green-700";

                            return (
                                <li
                                    key={i}
                                    className="flex items-center justify-between text-sm"
                                >
                                    <span className="text-gray-700">{metric.name}</span>
                                    <span
                                        className={`font-semibold flex items-center gap-1 ${metric.color ?? trendColor}`}
                                    >
                                        {metric.value}
                                        <span className={`${trendColor} text-xs`}>{trendIcon}</span>
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ))}
        </div>
    );
}
