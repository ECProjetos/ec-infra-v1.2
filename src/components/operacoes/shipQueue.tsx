import { Card, CardHeader } from "../ui/card"

interface ShipQueueType {
    navio: string
    tipo_carga: string
    quantidade: string
    eta: string
    berco: string
    status: "Aguardando" | "Programado" | "Confirmando" | string
}

interface ShipQueueCardProps {
    data: ShipQueueType[]
}

// Cores de status baseadas no exemplo da imagem
function getStatusColor(status: string) {
    switch (status) {
        case "Aguardando":
            return "bg-blue-100 text-blue-700"
        case "Programado":
            return "bg-green-100 text-green-700"
        case "Confirmando":
            return "bg-yellow-100 text-yellow-800"
        default:
            return "bg-gray-100 text-gray-600"
    }
}

export function ShipQueueCard({ data }: ShipQueueCardProps) {
    return (
        <Card className="p-10 transition-transform duration-300 ease-out hover:-translate-y-2 h-full">
            <CardHeader className="text-xl font-semibold">
                Fila de Navios - Próximas 48h
            </CardHeader>
            <div >
                <table className="w-full text-center overflow-y-auto border-separate border-spacing-y-2 ">
                    <thead className="shadow-sm">
                        <tr className="text-gray-700 text-sm">
                            <th className="font-semibold pb-2">Navio</th>
                            <th className="font-semibold pb-2">Tipo de Carga</th>
                            <th className="font-semibold pb-2">Quantidade</th>
                            <th className="font-semibold pb-2">ETA</th>
                            <th className="font-semibold pb-2">Berço</th>
                            <th className="font-semibold pb-2">Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {data.map((item, idx) => (
                            <tr key={idx} className="border-b last:border-b border-gray-200">
                                <td className="font-semibold py-2">{item.navio}</td>
                                <td>{item.tipo_carga}</td>
                                <td>{item.quantidade}</td>
                                <td>{item.eta}</td>
                                <td>{item.berco}</td>
                                <td>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                                        {item.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    )
}
