import { ProgressBar } from "@/components/progessBar";
import { Card, CardHeader } from "../ui/card";

interface CapacityCardType {
    carga: string;
    qtd_max: number;
    qtd_atual: number;
}

interface CapacityCardProps {
    data: CapacityCardType[];
}

export function CapacityCard({ data }: CapacityCardProps) {
    const formatK = (value: number) =>
        (value / 1000).toLocaleString("pt-BR", {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1,
        }) + "k";

    return (
        <Card className="p-6 transition-transform duration-300 ease-out hover:-translate-y-2 h-full overflow-y-auto">
            <CardHeader className="text-2xl font-semibold">
                Capacidade de Armazenagem
            </CardHeader>

            <div className="flex flex-col gap-6 mt-3">
                {data.map((item, idx) => {
                    const percent = Math.round((item.qtd_atual / item.qtd_max) * 100);

                    return (
                        <div key={idx}>
                            <div className="text-sm font-medium mb-1">{item.carga}</div>

                            <ProgressBar data={[{ value1: item.qtd_atual, value2: item.qtd_max }]} />

                            <div className="text-xs text-gray-500 mt-1">
                                {formatK(item.qtd_atual)} / {formatK(item.qtd_max)} ton ({percent}%)
                            </div>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
}
