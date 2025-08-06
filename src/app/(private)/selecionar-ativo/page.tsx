"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AtivoCreationType } from "@/app/types/ativos/ativos";
import { AtivoCard } from "@/components/selecionar-ativo/ativoCard";
import { getAtivos } from "@/app/actions/ativos/ativo";

export default function SelecionarAtivo() {
    const [ativos, setAtivos] = useState<AtivoCreationType[]>([]);
    const router = useRouter();

    useEffect(() => {
        async function fetchAtivos() {
            const data = await getAtivos();
            setAtivos(data as AtivoCreationType[]);
        }

        fetchAtivos();
    }, []);

    function handleClick(ativoUrl: string) {
        localStorage.setItem('selectedAtivo', ativoUrl);
        router.push(`/${ativoUrl}/dashboard`);
    }

    return (
        <div className="p-20">
            <h1 className="text-3xl font-bold mb-8">Seus ativos de infraestrutura</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ativos.map((ativo, idx) => (
                    <AtivoCard
                        key={idx}
                        icon="porto"
                        name={ativo.name}
                        city={ativo.city}
                        uf={ativo.uf}
                        description={ativo.description}
                        onAccessClick={() => handleClick(ativo.url)}
                    />
                ))}
            </div>
        </div>
    );
}
