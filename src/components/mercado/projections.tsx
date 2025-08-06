import { Card } from "../ui/card";

interface CenarioInfoItem {
    label: string;
    value: string;
    color?: string;
}

type CenarioColor = "green" | "blue" | "red";

const observacaoStyles = {
    green: "bg-green-50 text-green-800",
    blue: "bg-blue-50 text-blue-800",
    red: "bg-red-50 text-red-800",
};

interface CenarioResumoCardProps {
    title: string;
    info: CenarioInfoItem[];
    observacao: string;
    observacaoColor?: CenarioColor;
}

export function CenarioResumoCard({
    title,
    info,
    observacao,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    observacaoColor = "green" as any,
}: CenarioResumoCardProps) {
    return (
        <Card className="rounded-xl p-5 border shadow-sm space-y-3 w-full">
            <h3 className="font-semibold text-base">{title}</h3>
            <div className="text-sm space-y-1">
                {info.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-muted-foreground ">
                        <span>{item.label}</span>
                        <span className={`font-semibold ${item.color ?? "text-gray-900"}`}>
                            {item.value}
                        </span>
                    </div>
                ))}
            </div>
            <div className={`rounded-md px-4 py-2 text-sm font-medium ${observacaoStyles[observacaoColor]}`}>
                {observacao}
            </div>
        </Card>
    );
}
