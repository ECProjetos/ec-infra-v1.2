'use client';

import { ProgramaCard } from "@/components/sustentabilidade/programas/botCards";
import { NewProgram } from "@/components/sustentabilidade/programas/newProgram";
import { TopCards } from "@/components/sustentabilidade/programas/topCards";
import { Card } from "@/components/ui/card";
import { Heart, Leaf, Waves } from "lucide-react";


export default function SustentabilidadeDashboard() {
    return (
        <div className="px-10 py-10 space-y-10">
            <div className="flex justify-between items-start">
                <h1 className="text-2xl font-semibold">Criação de Planos e Programas Ambientais</h1>
                <NewProgram />
            </div>
            <div className="flex max-w-full gap-8">
                <TopCards
                    title="Programas Básicos"
                    value={8}
                    subtitle="Obrigatórios por licença"
                    icon={<Waves />}
                    color="from-blue-500 to-blue-600"
                />

                <TopCards
                    title="Programas Específicos"
                    value={12}
                    subtitle="Condicionantes especiais"
                    icon={<Leaf />}
                    color="from-green-500 to-green-600"
                />

                <TopCards
                    title="Programas Voluntários"
                    value={3}
                    subtitle="Iniciativas próprias"
                    icon={<Heart />}
                    color="from-purple-500 to-purple-600"
                />
            </div>
            <Card className="p-8 shadow-xl">
                <div className="flex justify-between items-start">
                    <h1 className="font-semibold text-xl">
                        Programas Criados
                    </h1>
                    <div className="gap-10">
                        <select className=" p-3 shadow-md rounded-xl">
                            <option>
                                Todas as categorias
                            </option>
                            <option>
                                Básicos
                            </option>
                            <option>
                                Específicos
                            </option>
                            <option>
                                Voluntários
                            </option>
                        </select>
                        <input placeholder="Buscar programa..." className="p-3 shadow-md rounded-xl mx-10">
                        </input>
                    </div>

                </div>

                <div className="flex w-full gap-5">
                    <ProgramaCard
                        titulo="PQAA - Programa de Qualidade das Águas"
                        descricao="Monitoramento contínuo da qualidade da água portuária"
                        responsavel="Maria Silva"
                        frequencia="mensal"
                        status="Conforme"
                        corStatus="green"
                    />

                    <ProgramaCard
                        titulo="PCA - Programa de Controle Ambiental"
                        descricao="Controle de ruído, vibração e emissões atmosféricas"
                        responsavel="João Santos"
                        frequencia="mensal"
                        status="Atenção"
                        corStatus="yellow"
                    />
                </div>
            </Card >
        </div >
    )
}