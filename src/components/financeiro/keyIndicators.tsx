// IndicadoresChave.tsx
interface Indicador {
    nome: string
    valor: string
    valorColor: string
    progress: number  // de 0 a 1
    progressColor: string
}

const indicadores: Indicador[] = [
    {
        nome: "ROB",
        valor: "R$ 18.7M",
        valorColor: "text-green-500",
        progress: 0.88,
        progressColor: "bg-green-500"
    },
    {
        nome: "ROL",
        valor: "R$ 12.4M",
        valorColor: "text-blue-600",
        progress: 0.60,
        progressColor: "bg-blue-500"
    },
    {
        nome: "Liquidez Corrente",
        valor: "2.1",
        valorColor: "text-green-600",
        progress: 0.80,
        progressColor: "bg-green-500"
    },
    {
        nome: "Endividamento",
        valor: "35.2%",
        valorColor: "text-yellow-600",
        progress: 0.33,
        progressColor: "bg-yellow-400"
    },
    {
        nome: "Custos Diretos",
        valor: "R$ 26.5M",
        valorColor: "text-red-500",
        progress: 0.50,
        progressColor: "bg-red-500"
    },
    {
        nome: "Custos Indiretos",
        valor: "R$ 7.6M",
        valorColor: "text-orange-500",
        progress: 0.18,
        progressColor: "bg-orange-500"
    },
    {
        nome: "Margem de Lucro",
        valor: "24.6%",
        valorColor: "text-green-500",
        progress: 0.82,
        progressColor: "bg-green-500"
    }
]

export function IndicadoresChave() {
    return (
        <div className="bg-white p-6 rounded-xl border shadow-sm overflow-y-auto h-full transition-transform duration-300 ease-out hover:-translate-y-2">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Indicadores Chave</h2>
            <div className="space-y-4">
                {indicadores.map((ind) => (
                    <div key={ind.nome}>
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-gray-800">{ind.nome}</span>
                            <span className={`font-semibold ${ind.valorColor}`}>{ind.valor}</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full">
                            <div
                                className={`${ind.progressColor} h-2 rounded-full`}
                                style={{ width: `${ind.progress * 100}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
