import { LucidePlusCircle, LucideMinusCircle, LucideLightbulb, LucideAlertTriangle } from "lucide-react";

interface CharCardProps {
    titulo: string;
    items: string[];
    tipo: "forca" | "fraqueza" | "oportunidade" | "ameaca";
}

const config = {
    forca: {
        color: "green",
        bg: "bg-green-50",
        border: "border-green-200",
        text: "text-green-800",
        bullet: "text-green-600",
        icon: <LucidePlusCircle className="w-4 h-4 mr-1" />
    },
    fraqueza: {
        color: "red",
        bg: "bg-red-50",
        border: "border-red-200",
        text: "text-red-800",
        bullet: "text-red-600",
        icon: <LucideMinusCircle className="w-4 h-4 mr-1" />
    },
    oportunidade: {
        color: "blue",
        bg: "bg-blue-50",
        border: "border-blue-200",
        text: "text-blue-800",
        bullet: "text-blue-600",
        icon: <LucideLightbulb className="w-4 h-4 mr-1" />
    },
    ameaca: {
        color: "yellow",
        bg: "bg-yellow-50",
        border: "border-yellow-200",
        text: "text-yellow-800",
        bullet: "text-yellow-600",
        icon: <LucideAlertTriangle className="w-4 h-4 mr-1" />
    }
};

export function CharCard({ titulo, items, tipo }: CharCardProps) {
    const theme = config[tipo];

    return (
        <div className={`rounded-xl p-6 border ${theme.bg} ${theme.border} w-full h-full transition-transform duration-300 ease-out hover:-translate-y-2`}>
            <h2 className={`text-lg font-bold mb-3 flex items-center ${theme.text}`}>
                {theme.icon}
                {titulo}
            </h2>
            <ul className="list-disc pl-5 space-y-1">
                {items.map((item, idx) => (
                    <li key={idx} className={`${theme.bullet} text-sm`}>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}
