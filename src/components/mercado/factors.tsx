import { Card } from "../ui/card";

interface Fator {
    titulo: string;
    descricao: string;
    cor: string; // ex: bg-green-500
}

interface FatoresCompetitivosCardProps {
    titulo: string;
    fatores: Fator[];
}

export function FatoresCompetitivosCard({
    titulo,
    fatores,
}: FatoresCompetitivosCardProps) {
    return (
        <Card className="p-6 rounded-xl border shadow-sm space-y-4 w-full">
            <h3 className="font-semibold text-lg">{titulo}</h3>
            <ul className="space-y-3 text-sm">
                {fatores.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                        <span className={`w-2.5 h-2.5 mt-1 rounded-full ${item.cor}`} />
                        <div>
                            <p className="font-semibold">{item.titulo}</p>
                            <p className="text-muted-foreground">{item.descricao}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </Card>
    );
}
