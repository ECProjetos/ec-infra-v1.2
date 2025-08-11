"use client";

import { useActionState, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import MultiSelect from "../ui/multiselect";
import { useAtivoStore } from "@/stores/useAtivoStore";
import { getGroups } from "@/app/actions/permissoes/getGroups";
import { CreatePermissionGroup } from "@/app/actions/permissoes/createGroups";

// Tipagem para grupo
interface GroupType {

    group_id?: string,
    nome: string;
    permissoes: string[];
}

const permissoes = [
    { label: "Dashboard", value: "dashboard" },
    { label: "Operações", value: "operacoes" },
    { label: "Financeiro", value: "financeiro" },
    { label: "Inteligência de Mercado", value: "mercado" },
    { label: "Gestão Estratégica", value: "estrategica" },
    { label: "Gestão de Infraestrutura", value: "infraestrutura" },
    { label: "Dashboard de Sustentabilidade", value: "sustentabilidade/dashboard" },
    { label: "PBA do porto", value: "sustentabilidade/pba-do-porto" },
    { label: "Licensas Ambientais", value: "sustentabilidade/licensas" },
    { label: "Cadastro P&P", value: "sustentabilidade/criar-programa" },
    { label: "Geração de relatórios", value: "sustentabilidade/gerar-relatorios" },
];

const initialState = { success: false, error: "" };

export default function GroupRepeater({ name }: { name: string }) {
    const [state, formActionGroup] = useActionState(
        async (
            prevState: { success: boolean; error: string },
            formData: FormData
        ) => {
            // Pegando e parseando os dados
            const raw = formData.get(name);
            const allGroups: GroupType[] = raw ? JSON.parse(raw as string) : [];

            // Filtra apenas os novos (sem ID)
            const newGroups = allGroups.filter(g => !g.group_id);

            // Atualiza o formData com os grupos novos
            formData.set(name, JSON.stringify(newGroups));

            // Chama o backend com apenas os novos
            const result = await CreatePermissionGroup(formData);

            return {
                success: result.success,
                error: result.error ?? "",
            };
        },
        initialState
    );

    const [group, setGroup] = useState<GroupType[]>([]);
    const asset = useAtivoStore();
    const assetId = asset.ativo?.id;

    useEffect(() => {
        const fetchGroups = async () => {
            if (!assetId) return;
            const groups = await getGroups({ asset_id: assetId });
            setGroup(groups.length > 0 ? groups : [{ nome: "", permissoes: [] }]);
        };
        fetchGroups();
    }, [assetId]);

    const handleAdd = () => {
        setGroup([...group, { nome: "", permissoes: [] }]);
    };

    const handleRemove = (index: number) => {
        if (group.length === 1) return;
        setGroup(group.filter((_, idx) => idx !== index));
    };

    const handleChange = <K extends keyof GroupType>(
        index: number,
        field: K,
        value: GroupType[K]
    ) => {
        setGroup((prev) =>
            prev.map((item, idx) =>
                idx === index ? { ...item, [field]: value } : item
            )
        );
    };

    const isFormValid = group.length > 0 && group.every(g => g.nome.trim() !== "" && g.permissoes.length > 0);

    return (
        <form className="space-y-8 p-4" action={formActionGroup}>
            <input type="hidden" name="asset_id" value={assetId ?? ""} />
            <input
                type="hidden"
                name={name}
                value={JSON.stringify(group)}
                readOnly
            />

            {/* Feedback de sucesso/erro */}
            {state.error && (
                <div className="text-red-600 bg-red-100 p-3 rounded">
                    {state.error}
                </div>
            )}
            {state.success && (
                <div className="text-green-600 bg-green-100 p-3 rounded">
                    Configurações salvas com sucesso!
                </div>
            )}

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
                <div
                    key={index}
                    className="border-l-4 border-blue-600 bg-gray-50 p-4 rounded-md mb-3 space-y-4"
                >
                    <h4 className="text-lg font-semibold mb-2">Grupo {index + 1}</h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label className="mb-1 block">Nome do grupo</Label>
                            <Input
                                className="w-full bg-white"
                                value={item.nome}
                                onChange={(e) =>
                                    handleChange(index, "nome", e.target.value)
                                }
                            />
                        </div>
                        <div>
                            <Label className="mb-1 block">Permissões</Label>
                            <MultiSelect
                                options={permissoes}
                                value={item.permissoes}
                                onChange={(val) =>
                                    handleChange(index, "permissoes", val)
                                }
                                placeholder="Selecione permissões..."
                                className="w-full"
                            />
                        </div>
                    </div>

                    {group.length > 1 && (
                        <div className="text-right">
                            <Button
                                type="button"
                                onClick={() => handleRemove(index)}
                                className="bg-red-600 hover:bg-red-700 text-white"
                            >
                                Deletar Grupo
                            </Button>
                        </div>
                    )}
                </div>
            ))}

            <Button
                type="submit"
                className="bg-blue-600 text-white hover:bg-blue-700"
                disabled={!isFormValid}
            >
                Salvar Configurações
            </Button>
        </form>
    );
}
