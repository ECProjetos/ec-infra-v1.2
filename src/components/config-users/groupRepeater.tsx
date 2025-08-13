/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import MultiSelect from "../ui/multiselect";
import { useAtivoStore } from "@/stores/useAtivoStore";
import { getGroups } from "@/app/actions/permissoes/getGroups";
import { CreatePermissionGroup } from "@/app/actions/permissoes/createGroups";

// Tipagem para grupo
interface GroupType {
    group_id?: string;
    nome: string;
    permissoes: string[];
}

// -------- Helpers --------
const normalizePerm = (p: string) => p.replace(/^\/+/, "");
const normalizePermArray = (arr: string[]) => arr.map(normalizePerm);

// --------- Opções de Permissões (padronizadas e com nested) ----------
const permissoesOptions = [
    { label: "Dashboard", value: "dashboard" },
    { label: "Operações", value: "operacoes" },
    { label: "Financeiro", value: "financeiro" },
    { label: "Inteligência de Mercado", value: "mercado" },
    { label: "Gestão Estratégica", value: "estrategica" },
    { label: "Gestão de Infraestrutura", value: "infraestrutura" },

    // Sustentabilidade (grupo e filhos)
    { label: "Sustentabilidade (grupo)", value: "sustentabilidade" },
    { label: "Dashboard de Sustentabilidade", value: "sustentabilidade/dashboard" },
    { label: "Laboratórios", value: "sustentabilidade/laboratorios" },

    // Licenças Ambientais (grupo e filhos)
    { label: "Licenças Ambientais (grupo)", value: "sustentabilidade/licensas" },
    { label: "Licenças Ambientais • Dashboard", value: "sustentabilidade/licensas/dashboard" },
    { label: "Licenças Ambientais • Coleta de Dados", value: "sustentabilidade/licensas/coleta-dados" },

    { label: "Cadastro P&P", value: "sustentabilidade/criar-programa" },
    { label: "PBA do Porto", value: "sustentabilidade/pba-do-porto" },
    { label: "Geração de relatórios", value: "sustentabilidade/gerar-relatorios" },
];

const initialState = { success: false, error: "" };

export default function GroupRepeater({ name }: { name: string }) {
    const [state, formActionGroup] = useActionState(
        async (
            prevState: { success: boolean; error: string },
            formData: FormData
        ) => {
            try {
                // Pega e parseia todos os grupos do hidden input
                const raw = formData.get(name);
                const allGroups: GroupType[] = raw ? JSON.parse(raw as string) : [];

                // Garante normalização antes de enviar
                const normalizedGroups = allGroups.map((g) => ({
                    ...g,
                    permissoes: normalizePermArray(g.permissoes),
                }));

                // Filtra apenas os novos (sem ID)
                const newGroups = normalizedGroups.filter((g) => !g.group_id);

                // Atualiza o formData com os grupos novos normalizados
                formData.set(name, JSON.stringify(newGroups));

                // Chama o backend com apenas os novos
                const result = await CreatePermissionGroup(formData);

                return {
                    success: result.success,
                    error: result.error ?? "",
                };
            } catch (e: any) {
                return {
                    success: false,
                    error: e?.message ?? "Erro desconhecido ao salvar grupos.",
                };
            }
        },
        initialState
    );

    const [group, setGroup] = useState<GroupType[]>([{ nome: "", permissoes: [] }]);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadError, setLoadError] = useState<string>("");

    const asset = useAtivoStore();
    const assetId = asset.ativo?.id;

    // Carrega grupos existentes do ativo e normaliza as permissões
    useEffect(() => {
        const fetchGroups = async () => {
            if (!assetId) return;
            setLoading(true);
            setLoadError("");
            try {
                const groups = await getGroups({ asset_id: assetId });

                if (groups.length > 0) {
                    setGroup(
                        groups.map((g) => ({
                            ...g,
                            permissoes: normalizePermArray(g.permissoes ?? []),
                        }))
                    );
                } else {
                    setGroup([{ nome: "", permissoes: [] }]);
                }
            } catch (e: any) {
                setLoadError(e?.message ?? "Não foi possível carregar os grupos.");
                setGroup([{ nome: "", permissoes: [] }]);
            } finally {
                setLoading(false);
            }
        };
        fetchGroups();
    }, [assetId]);

    const handleAdd = () => {
        setGroup((prev) => [...prev, { nome: "", permissoes: [] }]);
    };

    const handleRemove = (index: number) => {
        setGroup((prev) => (prev.length === 1 ? prev : prev.filter((_, i) => i !== index)));
    };

    const handleChange = <K extends keyof GroupType>(
        index: number,
        field: K,
        value: GroupType[K]
    ) => {
        setGroup((prev) =>
            prev.map((item, idx) => (idx === index ? { ...item, [field]: value } : item))
        );
    };

    // Validação básica
    const isFormValid =
        group.length > 0 &&
        group.every(
            (g) => g.nome.trim() !== "" && (g.permissoes?.length ?? 0) > 0
        );

    // Valor serializado (já normalizado) para enviar no hidden
    const serialized = useMemo(
        () =>
            JSON.stringify(
                group.map((g) => ({
                    ...g,
                    permissoes: normalizePermArray(g.permissoes ?? []),
                }))
            ),
        [group]
    );

    return (
        <form className="space-y-8 p-4" action={formActionGroup}>
            <input type="hidden" name="asset_id" value={assetId ?? ""} />
            <input type="hidden" name={name} value={serialized} readOnly />

            {/* Feedback de loading/erro de carregamento */}
            {loading && (
                <div className="text-sm text-zinc-600 bg-zinc-100 p-3 rounded">
                    Carregando grupos...
                </div>
            )}
            {loadError && (
                <div className="text-red-600 bg-red-100 p-3 rounded">
                    {loadError}
                </div>
            )}

            {/* Feedback de sucesso/erro ao salvar */}
            {state.error && (
                <div className="text-red-600 bg-red-100 p-3 rounded">{state.error}</div>
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
                    key={item.group_id ?? index}
                    className="border-l-4 border-blue-600 bg-gray-50 p-4 rounded-md mb-3 space-y-4"
                >
                    <h4 className="text-lg font-semibold mb-2">Grupo {index + 1}</h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label className="mb-1 block">Nome do grupo</Label>
                            <Input
                                className="w-full bg-white"
                                value={item.nome}
                                onChange={(e) => handleChange(index, "nome", e.target.value)}
                            />
                        </div>
                        <div>
                            <Label className="mb-1 block">Permissões</Label>
                            <MultiSelect
                                options={permissoesOptions}
                                value={item.permissoes}
                                onChange={(val) =>
                                    handleChange(index, "permissoes", normalizePermArray(val))
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
                disabled={!isFormValid || loading}
            >
                Salvar Configurações
            </Button>
        </form>
    );
}
