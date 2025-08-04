import { Card } from "../ui/card";
import { cn } from "@/lib/utils";

interface TerminalData {
    terminal: string;
    volumeAtual: string;
    volumeProjetado: string;
    cagr: string;
    marketShare: string;
    posicao: number;
    destaque?: boolean;
    cagrColor?: string; // ex: "text-green-600"
    marketShareColor?: string; // ex: "text-blue-600"
}

interface PosicionamentoCompetitivoTableProps {
    data: TerminalData[];
    title?: string;
}

export function PosicionamentoCompetitivoTable({
    data,
    title = "Posicionamento Competitivo - Projeção 2029",
}: PosicionamentoCompetitivoTableProps) {
    return (
        <Card className="p-6 rounded-xl shadow-sm border w-full">
            <h3 className="font-semibold text-lg mb-4">{title}</h3>

            <div className="overflow-auto">
                <table className="min-w-full text-sm">
                    <thead>
                        <tr className="text-muted-foreground text-left border-b">
                            <th className="py-2">Terminal</th>
                            <th className="py-2">Volume Atual (2024)</th>
                            <th className="py-2">Volume Projetado (2029)</th>
                            <th className="py-2">CAGR</th>
                            <th className="py-2">Market Share 2029</th>
                            <th className="py-2">Posição</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, idx) => (
                            <tr
                                key={idx}
                                className={cn(
                                    "border-b",
                                    row.destaque ? "bg-blue-50 font-semibold" : ""
                                )}
                            >
                                <td className="py-2 px-1">
                                    {row.destaque ? (
                                        <span className="text-blue-700 font-medium">{row.terminal}</span>
                                    ) : (
                                        <span className="font-medium">{row.terminal}</span>
                                    )}
                                </td>
                                <td className="py-2 px-1">{row.volumeAtual}</td>
                                <td className="py-2 px-1 font-bold text-blue-700">{row.volumeProjetado}</td>
                                <td className={`py-2 px-1 font-semibold ${row.cagrColor}`}>{row.cagr}</td>
                                <td className={`py-2 px-1 font-semibold ${row.marketShareColor}`}>{row.marketShare}</td>
                                <td className="py-2 px-1">
                                    <div className="bg-muted text-xs px-2 py-1 rounded-md w-fit font-medium text-muted-foreground">
                                        {row.posicao}º
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}
