import { ReactNode } from "react";
import { Card } from "../ui/card";

interface InfoItem {
    label: string;
    value: string | number;
    color: string; // ex: text-green-600 ou text-red-600
}

type ObservacaoColor = keyof typeof observacaoStyles;

interface ProdutoResumoCardProps {
    title: string;
    icon?: ReactNode;
    info: InfoItem[];
    observacao?: string;
    observacaoColor?: ObservacaoColor;
}

const observacaoStyles = {
    green: "bg-green-50 text-green-800",
    blue: "bg-blue-50 text-blue-800",
    yellow: "bg-yellow-50 text-yellow-800",
};

export function ProdutoResumoCard({
    title,
    icon,
    info,
    observacao,
    observacaoColor = "green",
}: ProdutoResumoCardProps) {
    return (
        <Card className="rounded-xl p-5 border shadow-sm space-y-3 w-full">
            <div className="flex justify-between items-center">
                <h3 className="font-semibold text-base">{title}</h3>
                {icon && <div className="p-2 rounded-md bg-yellow-100">{icon}</div>}
            </div>

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
            <h4> Projeções de médio prazo</h4>
        </Card >
    )
}
