'use client'

import { Ship, Plane } from "lucide-react";

type IconType = "porto" | "aeroporto";

interface AtivoCardProps {
    icon: IconType;
    name: string;
    city: string;
    uf: string;
    description: string;
    onAccessClick?: () => void;
}

const icons = {
    porto: <Ship className="w-6 h-6 text-blue-600" />,
    aeroporto: <Plane className="w-6 h-6 text-blue-600" />,
};

export function AtivoCard({
    icon,
    name,
    city,
    uf,
    description,
    onAccessClick,
}: AtivoCardProps) {
    return (
        <div className="rounded-xl border border-blue-100 p-6 bg-white shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-3">
                {icons[icon]}
                <div>
                    <h3 className="font-bold text-lg">{name}</h3>
                    <span className="text-gray-600 text-sm">{city} - {uf}</span>
                </div>
            </div>
            <p className="text-gray-700 text-sm">{description}</p>
            <button
                onClick={onAccessClick}
                className="mt-3 bg-gradient-to-r from-blue-600 to-purple-500 text-white rounded-md py-2 px-4 font-semibold hover:from-blue-700"
            >
                Acessar Sistema EC Infra
            </button>
        </div>
    );
}
