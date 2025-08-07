import { Card, CardHeader } from "../ui/card";

interface EquipData {
    name: string,
    status: string,
}

interface EquipCardProps {
    data: EquipData[];

}



export function EquipCard({ data }: EquipCardProps) {
    return (
        <Card className="transition-transform duration-300 ease-out hover:-translate-y-2 h-full overflow-y-auto hover:shadow-xl">
            <CardHeader>
                <h1 className="text-2xl font-semibold mb-4">Status dos Equipamentos</h1>
                <ul className="space-y-2">
                    {data.map((equip, index) => (
                        <li key={index} className="flex justify-between items-center">
                            <span className="font-medium">{equip.name}</span>
                            <span
                                className={`text-sm px-2 py-1 rounded-full ${equip.status === "Operacional"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-orange-800"
                                    }`}
                            >
                                {equip.status}
                            </span>
                        </li>
                    ))}
                </ul>
            </CardHeader>
        </Card>
    );
}

interface ShipsData {
    name: string;
    eta: string;
    cargo: string;
    cargo_amount: number;
}

interface ShipsCardProps {
    data: ShipsData[];
}

export function ShipsCard({ data }: ShipsCardProps) {
    return (
        <Card className="p-5 transition-transform duration-300 ease-out hover:-translate-y-2 h-full overflow-y-auto hover:shadow-xl">
            <h2 className="text-lg font-semibold mb-1">Próximos Navios</h2>
            <ul className="space-y-4">
                {data.map((ship, index) => (
                    <li key={index} className="flex justify-between items-start">
                        <div>
                            <p className="font-medium">{ship.name}</p>
                            <p className="text-sm text-gray-600">
                                {ship.cargo} - {ship.cargo_amount.toLocaleString("pt-BR")} ton
                            </p>
                        </div>
                        <span className="text-sm text-blue-600 font-medium whitespace-nowrap">
                            {ship.eta}
                        </span>
                    </li>
                ))}
            </ul>
        </Card >
    );
}

interface AlertData {
    type: string,
    title: string,
    description: string,
}

interface AlertsCardProps {
    data: AlertData[];
}


export function AlertsCard({ data }: AlertsCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm p-5 w-full h-full transition-transform duration-300 ease-out hover:-translate-y-2 h-full overflow-y-auto hover:shadow-xl">
            <h2 className="text-lg font-semibold mb-4 mx-3">Alertas</h2>
            <ul className="space-y-4">
                {data.map((alert, index) => (
                    <li key={index} className="flex items-start space-x-2">
                        <span
                            className={`w-2 h-2 mt-2 rounded-full `}
                        ></span>
                        <div>
                            <p className="font-medium">{alert.title}</p>
                            <p className="text-sm text-gray-600">{alert.description}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
