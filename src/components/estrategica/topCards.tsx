'use  client';

import { ProgressBar } from "../progessBar";
import { Card } from "../ui/card";

interface TopCards {
    titulo: string;
    meta: number;
    atual: number;
    unidade: string;
}

interface TopCardsProps {
    data: TopCards[];
}

function formatMeta(meta: number, unidade: string) {
    if (unidade === "R$") {
        if (meta >= 1_000_000) return `R$ ${(meta / 1_000_000).toFixed(1)}M`;
        if (meta >= 1_000) return `R$ ${(meta / 1_000).toFixed(1)}K`;
        return `R$ ${meta}`;
    }
    if (unidade === "%") {
        return `${meta}%`;
    }
    if (unidade === "ton/ano") {
        if (meta >= 1_000_000) return `${(meta / 1_000_000).toFixed(1)}M ton/ano`;
        if (meta >= 1_000) return `${(meta / 1_000).toFixed(1)}K ton/ano`;
        return `${meta} ton/ano`;
    }
    return `${meta} ${unidade}`;
}

export function TopCardsLayout({ data }: TopCardsProps) {
    return (
        <>
            {data.map((card, idx) => (
                <Card key={idx} className="w-full p-5 mt-10 transition-transform duration-300 ease-out hover:-translate-y-2">
                    <h1 className="font-semibold text-lg mb-4">{card.titulo}</h1>
                    <div className="mb-2 flex items-center justify-between">
                        <span className="text-gray-500">Meta Anual</span>
                        <span className="text-lg font-bold">
                            {formatMeta(card.meta, card.unidade)}
                        </span>
                    </div>
                    <div className="mb-4 flex items-center justify-between">
                        <span className="text-gray-500">Realizado YTD</span>
                        <span className="text-lg font-bold text-green-600">
                            {formatMeta(card.atual, card.unidade)}
                        </span>
                    </div>

                    <ProgressBar data={[{ value1: card.atual, value2: card.meta }]} />

                    <div className="text-xs text-gray-500">
                        {(card.atual / card.meta * 100).toFixed(1)}% da meta anual
                    </div>
                </Card>
            ))}
        </>
    );
}
