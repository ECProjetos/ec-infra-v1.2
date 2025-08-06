"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";

export function EquipamentoRepeater() {
    const [equipamentos, setEquipamentos] = useState([
        {
            tipo: "",
            modelo: "",
            quantidade: "",
            capacidade: "",
            unidade: "",
            descritivo: "",
        },
    ]);

    const handleAdd = () => {
        setEquipamentos([
            ...equipamentos,
            {
                tipo: "",
                modelo: "",
                quantidade: "",
                capacidade: "",
                unidade: "",
                descritivo: "",
            },
        ]);
    };

    const handleRemove = (index: number) => {
        const novos = [...equipamentos];
        novos.splice(index, 1);
        setEquipamentos(novos);
    };

    const handleChange = (index: number, field: string, value: string) => {
        const novos = [...equipamentos];
        novos[index][field as keyof typeof novos[0]] = value;
        setEquipamentos(novos);
    };

    const tipos = ["Guindaste", "Empilhadeira", "Caminhão", "Esteira", "Outro"];
    const unidades = ["toneladas", "litros", "m³", "unidades"];

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm">Lista de Equipamentos</h4>
                <Button
                    type="button"
                    variant="default"
                    onClick={handleAdd}
                    className="bg-green-600 hover:bg-green-700 text-white"
                >
                    + Adicionar Equipamento
                </Button>
            </div>

            {equipamentos.map((eq, index) => (
                <div key={index} className="space-y-3 bg-gray-50 p-4 rounded-md">
                    <div className="grid md:grid-cols-6 gap-3 items-end">
                        <div>
                            <Label>Tipo</Label>
                            <Select
                                value={eq.tipo}
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
                            <Label>Modelo/Marca</Label>
                            <Input
                                className="bg-white mt-1"
                                value={eq.modelo}
                                onChange={(e) => handleChange(index, "modelo", e.target.value)}
                            />
                        </div>

                        <div>
                            <Label>Quantidade</Label>
                            <Input
                                type="number"
                                className="bg-white mt-1"
                                value={eq.quantidade}
                                onChange={(e) =>
                                    handleChange(index, "quantidade", e.target.value)
                                }
                            />
                        </div>

                        <div>
                            <Label>Capacidade</Label>
                            <Input
                                placeholder="Ex: 40, 500"
                                className="bg-white mt-1"
                                value={eq.capacidade}
                                onChange={(e) =>
                                    handleChange(index, "capacidade", e.target.value)
                                }
                            />
                        </div>

                        <div>
                            <Label>Unidade</Label>
                            <Select
                                value={eq.unidade}
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
                            variant="destructive"
                            onClick={() => handleRemove(index)}
                            className="h-10 mt-6"
                        >
                            Deletar
                        </Button>
                    </div>

                    <div>
                        <Label>Descritivo</Label>
                        <Textarea
                            placeholder="Descrição detalhada do equipamento, especificações técnicas, estado de conservação..."
                            className="bg-white mt-1"
                            value={eq.descritivo}
                            onChange={(e) =>
                                handleChange(index, "descritivo", e.target.value)
                            }
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
