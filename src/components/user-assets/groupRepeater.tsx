import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import MultiSelect from "../ui/multiselect";

interface InfraProps {
    name: string
}

const permissoes = [
    { label: "Dashboard", value: "dashboard" },
    { label: "Operações", value: "operacoes" },
    { label: "Financeiro", value: "financeiro" },
    { label: "Inteligência de Mercado", value: "mercado" },
    { label: "Gestão Estratégica", value: "estrategica" },
    { label: "Gestão de Infraestrutura", value: "infraestrutura" },
    { label: "Sustentabilidade", value: "sustentabilidade" },
    { label: "Dashboard de Sustentabilidade", value: "sustentabilidade/dashboard" },
    { label: "Criar programa de Sustentabilidade", value: "sustentabilidade/criar-programa" },
    { label: "Gestão de medições de Sustentabilidade", value: "sustentabilidade/gestao-medicoes" },
    { label: "IDA ANTAQ de Sustentabilidade", value: "sustentabilidade/ida-antaq" },
];

export function GroupRepeater({ name }: InfraProps) {
    const [group, setInfra] = useState([
        { nome: "", permissoes: [] as string[] },
    ]);

    const handleAdd = () => {
        setInfra([...group, { nome: "", permissoes: [] }]);
    };

    const handleRemove = (index: number) => {
        setInfra(group.filter((_, idx) => idx !== index));
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChange = (index: number, field: keyof typeof group[0], value: any) => {
        const novos = group.map((item, idx) =>
            idx === index ? { ...item, [field]: value } : item
        );
        console.log(novos)
        setInfra(novos);

    };

    return (
        <div className="space-y-4">
            <input
                type="hidden"
                name={name}
                value={JSON.stringify(group)}
                readOnly
            />
            <div className="mb-4">
                <Button
                    type="button"
                    variant="default"
                    onClick={handleAdd}
                    className="bg-green-600 hover:bg-green-700 text-white"
                >
                    + Adicionar Grupo
                </Button>
            </div>

            {group.map((item, index) => (
                <div key={index} className="border-l-4 border-blue-600 rounded-sm flex items-center gap-4 bg-gray-50 p-4 rounded mb-3">
                    <div className="flex-1">
                        <Label className="mb-3">Nome do grupo</Label>
                        <Input
                            className="w-full bg-white"
                            value={item.nome}
                            onChange={e => handleChange(index, "nome", e.target.value)}
                        />
                    </div>
                    <div className="flex-1">
                        <Label className="mb-3">Permissões</Label>
                        <MultiSelect
                            options={permissoes}
                            value={item.permissoes}
                            onChange={val => handleChange(index, "permissoes", val)}
                            placeholder="Selecione permissões..."
                            className="w-full"
                        />
                    </div>
                    <Button
                        type="button"
                        onClick={() => handleRemove(index)}
                        className="bg-red-600 hover:bg-red-700"
                    >
                        Deletar
                    </Button>

                </div>

            ))}

        </div>
    );
}
