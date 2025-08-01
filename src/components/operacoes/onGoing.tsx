import { Ship } from "lucide-react";
import { Card, CardHeader } from "../ui/card"

interface OnGoing {
    nome: string,
    berco: string,
    tipo_carga: string,
    iniciado: string,
    previsao: string,
    prancha: number,
    status: string,
    carga_atual: number,
    carga_max: number
}

interface OnGoingProps {
    data: OnGoing[]
}

function getStatusColor(status: string) {
    if (status === "Operando") return "bg-blue-500 text-white";
    if (status === "Interrompido") return "bg-yellow-400 text-black";
    return "bg-gray-400 text-white";
}

function getCardColor(status: string) {
    if (status === "Operando") return "bg-blue-50 border-blue-200";
    if (status === "Interrompido") return "bg-green-50 border-green-200";
    return "bg-gray-50 border-gray-200";
}

function getBarColor(status: string) {
    if (status === "Operando") return "bg-blue-500";
    if (status === "Interrompido") return "bg-green-500";
    return "bg-gray-400";
}

function formatK(value: number) {
    return (value / 1000).toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + "k";
}

export function OnGoingCard({ data }: OnGoingProps) {
    return (
        <Card className="p-6 transition-transform duration-300 ease-out hover:-translate-y-2 h-full">
            <CardHeader className="text-2xl font-semibold mb-4">Operações em Andamento</CardHeader>
            <div className="flex flex-col gap-4">
                {data.map((item, idx) => {
                    const percent = Math.round((item.carga_atual / item.carga_max) * 100);
                    return (
                        <div
                            key={idx}
                            className={`rounded-xl border p-4 flex items-center justify-between gap-6 ${getCardColor(item.status)}`}
                        >
                            <div className="flex items-start gap-4 flex-1">
                                <div className={`rounded-lg p-3 flex items-center justify-center text-2xl ${item.status === "Operando" ? "bg-blue-500" : "bg-green-500"} text-white`}>
                                    <span><Ship className="w-5 h-5" /></span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold">{item.nome}</h3>
                                    <div className="text-sm text-gray-700 mb-1">{item.berco} • {item.tipo_carga}</div>
                                    <div className="flex gap-2 text-xs mb-1">
                                        <span className="text-gray-500">Iniciado: <span className="text-green-700">{item.iniciado}</span></span>
                                        <span className="text-gray-500">Previsão: <span className="text-blue-700">{item.previsao}</span></span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs mb-2">
                                        <span className="text-gray-600">Prancha: <span className="font-medium text-blue-700">{item.prancha.toLocaleString()} t/h</span></span>
                                        <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(item.status)}`}>
                                            {item.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {/* Coluna da direita */}
                            <div className="flex flex-col items-end w-48">
                                <div className={`font-bold text-xl mb-1 ${item.status === "Operando" ? "text-blue-600" : "text-green-600"}`}>
                                    {formatK(item.carga_atual)}/{formatK(item.carga_max)} ton
                                </div>
                                <div className="w-full">
                                    <div className="relative w-full h-2 rounded bg-gray-200 mb-1">
                                        <div
                                            className={`absolute h-2 rounded ${getBarColor(item.status)}`}
                                            style={{ width: `${percent}%` }}
                                        />
                                    </div>
                                    <div className="text-xs text-gray-600 text-right">{percent}% concluído</div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </Card>
    )
}
