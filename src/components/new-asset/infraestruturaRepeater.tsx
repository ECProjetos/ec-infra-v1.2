"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function InfraestruturaRepeater() {
    const [infra, setInfra] = useState([
        { tipo: "", descricao: "", quantidade: "", capacidade: "", unidade: "" },
    ]);

    const handleAdd = () => {
        setInfra([...infra, { tipo: "", descricao: "", quantidade: "", capacidade: "", unidade: "" }]);
    };

    const handleRemove = (index: number) => {
        const novos = [...infra];
        novos.splice(index, 1);
        setInfra(novos);
    };

    const handleChange = (index: number, field: string, value: string) => {
        const novos = [...infra];
        novos[index][field as keyof typeof novos[0]] = value;
        setInfra(novos);
    };

    const tipos = ["Armazém", "Pátio", "Galpão", "Tanque"];
    const unidades = ["m²", "m³", "toneladas", "litros"];

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm">Lista de Infraestrutura</h4>
                <Button
                    type="button"
                    variant="default"
                    onClick={handleAdd}
                    className="bg-green-600 hover:bg-green-700 text-white"
                >
                    + Adicionar Infraestrutura
                </Button>
            </div>

            {infra.map((item, index) => (
                <div
                    key={index}
                    className="grid md:grid-cols-6 gap-3 bg-gray-50 p-4 rounded-md items-end"
                >
                    <div>
                        <Label>Tipo</Label>
                        <Select
                            value={item.tipo}
                            onValueChange={(value) => handleChange(index, "tipo", value)}
                        >
                            <SelectTrigger className="bg-white mt-1">
                                <SelectValue placeholder="Selecione..." />
                            </SelectTrigger>
                            <SelectContent>
                                {tipos.map((tipo) => (
                                    <SelectItem key={tipo} value={tipo}>
                                        {tipo}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label>Descrição</Label>
                        <Input
                            placeholder="Ex: Armazém A1"
                            className="bg-white mt-1"
                            value={item.descricao}
                            onChange={(e) => handleChange(index, "descricao", e.target.value)}
                        />
                    </div>

                    <div>
                        <Label>Quantidade</Label>
                        <Input
                            type="number"
                            className="bg-white mt-1"
                            value={item.quantidade}
                            onChange={(e) => handleChange(index, "quantidade", e.target.value)}
                        />
                    </div>

                    <div>
                        <Label>Capacidade</Label>
                        <Input
                            placeholder="Ex: 5000, 1000"
                            className="bg-white mt-1"
                            value={item.capacidade}
                            onChange={(e) => handleChange(index, "capacidade", e.target.value)}
                        />
                    </div>

                    <div>
                        <Label>Unidade</Label>
                        <Select
                            value={item.unidade}
                            onValueChange={(value) => handleChange(index, "unidade", value)}
                        >
                            <SelectTrigger className="bg-white mt-1">
                                <SelectValue placeholder="Selecione..." />
                            </SelectTrigger>
                            <SelectContent>
                                {unidades.map((unidade) => (
                                    <SelectItem key={unidade} value={unidade}>
                                        {unidade}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>


                    <Button
                        type="button"
                        onClick={() => handleRemove(index)}
                        className=" mt-6 bg-red-600 hover:bg-red-700"
                    >
                        Deletar
                    </Button>
                </div>
            ))}
        </div>
    );
}
