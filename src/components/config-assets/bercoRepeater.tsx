"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface BerthProps {
    name: string
}

export function BercoRepeater({ name }: BerthProps) {
    const [descricaoGeral, setDescricaoGeral] = useState("");
    const [bercos, setBercos] = useState([
        { nome: "", comprimento: "", calado: "" },
    ]);

    const handleAdd = () => {
        setBercos([...bercos, { nome: "", comprimento: "", calado: "" }]);
    };

    const handleRemove = (index: number) => {
        const novos = [...bercos];
        novos.splice(index, 1);
        setBercos(novos);
    };

    const handleChange = (
        index: number,
        field: string,
        value: string
    ) => {
        const novos = [...bercos];
        novos[index][field as keyof typeof novos[0]] = value;
        setBercos(novos);
    };

    return (
        <div className="space-y-4">
            <input
                type="hidden"
                name={name}
                value={JSON.stringify({
                    descricao: descricaoGeral,
                    itens: bercos,
                })}
                readOnly
            />
            <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm">Berços/Cais</h4>
                <Button type="button" variant="default" onClick={handleAdd} className="bg-green-600 hover:bg-green-700 text-white">
                    + Adicionar Berço
                </Button>
            </div>

            {/* Descritivo Geral */}
            <div>
                <Label>Descritivo Geral dos Berços</Label>
                <Textarea
                    placeholder="Descrição geral sobre os berços e cais do terminal..."
                    className="bg-white mt-2"
                    value={descricaoGeral}
                    onChange={(e) => setDescricaoGeral(e.target.value)}
                />
            </div>

            {/* Lista dinâmica de berços */}
            {bercos.map((berco, index) => (
                <div key={index} className="grid md:grid-cols-4 gap-4 items-end bg-gray-50 p-4 rounded-md">
                    <div>
                        <Label>Nome/Número</Label>
                        <Input
                            className="bg-white mt-1"
                            value={berco.nome}
                            onChange={(e) => handleChange(index, "nome", e.target.value)}
                        />
                    </div>
                    <div>
                        <Label>Comprimento (m)</Label>
                        <Input
                            type="number"
                            className="bg-white mt-1"
                            value={berco.comprimento}
                            onChange={(e) => handleChange(index, "comprimento", e.target.value)}
                        />
                    </div>
                    <div>
                        <Label>Calado Máx. (m)</Label>
                        <Input
                            type="number"
                            className="bg-white mt-1"
                            value={berco.calado}
                            onChange={(e) => handleChange(index, "calado", e.target.value)}
                        />
                    </div>
                    <div className="px-9 !max-w-50 mt-6">
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={() => handleRemove(index)}
                            className="!w-full"
                        >
                            Deletar
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
}
