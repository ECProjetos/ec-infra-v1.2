'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

interface Responsavel {
    name: string;
    graduation: string;
    register: string;
}

export default function ResponsaveisTecnicos() {
    const [responsaveis, setResponsaveis] = useState<Responsavel[]>([
        { name: "", graduation: "", register: "" },
    ]);

    const addResponsavel = () => {
        setResponsaveis([...responsaveis, { name: "", graduation: "", register: "" }]);
    };

    const removeResponsavel = (index: number) => {
        const newResponsaveis = [...responsaveis];
        newResponsaveis.splice(index, 1);
        setResponsaveis(newResponsaveis);
    };

    const handleChange = (index: number, field: keyof Responsavel, value: string) => {
        const newResponsaveis = [...responsaveis];
        newResponsaveis[index][field] = value;
        setResponsaveis(newResponsaveis);
    };

    return (
        <div className="space-y-4">
            <label className="mb-1 block text-sm font-medium text-gray-700">Responsável Técnico</label>
            <input type="hidden" name="responsables" value={JSON.stringify(responsaveis)} />
            {responsaveis.map((responsavel, index) => (
                <div key={index} className="flex items-center gap-2">
                    <Input
                        value={responsavel.name}
                        onChange={(e) => handleChange(index, "name", e.target.value)}
                        placeholder="Nome"
                    />
                    <Input
                        value={responsavel.graduation}
                        onChange={(e) => handleChange(index, "graduation", e.target.value)}
                        placeholder="Formação"
                    />
                    <Input
                        value={responsavel.register}
                        onChange={(e) => handleChange(index, "register", e.target.value)}
                        placeholder="Número de Registro"
                    />

                    {index === 0 && (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={addResponsavel}
                        >
                            <Plus size={16} />
                        </Button>
                    )}

                    {responsaveis.length > 1 && (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => removeResponsavel(index)}
                        >
                            <Minus size={16} />
                        </Button>
                    )}
                </div>
            ))}
        </div>
    );
}