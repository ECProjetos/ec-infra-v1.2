"use client";

import { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import MultiSelect from "../ui/multiselect";
import { useAtivoStore } from "@/stores/useAtivoStore";
import { getGroups } from "@/app/actions/permissoes/getGroups";
import { getUsers } from "@/app/actions/users/getUsers";
import { createUserPermission } from "@/app/actions/permissoes/createUserPermission";
import { getUserPermissionsByAsset } from "@/app/actions/permissoes/getUserPermissionByAsset";
import { PermissionGroupsType } from "@/app/types/permissions/groups";
import { User } from "@supabase/supabase-js";

interface UserGroupAssignment {
    group_id: string;
    user_ids: string[];
}

const initialState = { success: false, error: "" };

export default function UserRepeater({ name }: { name: string }) {
    const [state, formAction] = useActionState(
        async (_prevState: typeof initialState, formData: FormData) => {
            const result = await createUserPermission(formData);
            return {
                success: result.success,
                error: result.error ?? "",
            };
        },
        initialState
    );

    const [groups, setGroups] = useState<PermissionGroupsType>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [assignments, setAssignments] = useState<UserGroupAssignment[]>([]);

    const asset = useAtivoStore();
    const assetId = asset.ativo?.id;

    useEffect(() => {
        const fetchAllData = async () => {
            if (!assetId) return;

            const [grupos, usuarios, atribuicoes] = await Promise.all([
                getGroups({ asset_id: assetId }),
                getUsers(),
                getUserPermissionsByAsset(assetId),
            ]);

            setGroups(grupos);
            setUsers(usuarios);
            setAssignments(
                atribuicoes.length > 0
                    ? atribuicoes
                    : [{ group_id: "", user_ids: [] }]
            );
        };

        fetchAllData();
    }, [assetId]);

    const groupOptions = groups?.map((g) => ({
        label: g.nome,
        value: g.group_id,
    })) ?? [];

    const userOptions = users?.map((u) => ({
        label: u.email ?? "",
        value: u.id,
    })) ?? [];

    const handleAdd = () => {
        setAssignments([...assignments, { group_id: "", user_ids: [] }]);
    };

    const handleRemove = (index: number) => {
        if (assignments.length === 1) return;
        setAssignments(assignments.filter((_, idx) => idx !== index));
    };

    const handleChange = <K extends keyof UserGroupAssignment>(
        index: number,
        field: K,
        value: UserGroupAssignment[K]
    ) => {
        setAssignments((prev) =>
            prev.map((item, idx) =>
                idx === index ? { ...item, [field]: value } : item
            )
        );
    };

    const isFormValid = assignments.length > 0 &&
        assignments.every(a => a.group_id && a.user_ids.length > 0);

    return (
        <form className="space-y-8 p-4" action={formAction}>
            <input type="hidden" name="asset_id" value={assetId ?? ""} />
            <input
                type="hidden"
                name={name}
                value={JSON.stringify(assignments)}
                readOnly
            />

            {/* Feedback */}
            {state.error && (
                <div className="text-red-600 bg-red-100 p-3 rounded">
                    {state.error}
                </div>
            )}
            {state.success && (
                <div className="text-green-600 bg-green-100 p-3 rounded">
                    Usuários atualizados com sucesso!
                </div>
            )}

            <div className="mb-4">
                <Button
                    type="button"
                    variant="default"
                    onClick={handleAdd}
                    className="bg-green-600 hover:bg-green-700 text-white"
                >
                    + Adicionar Grupo de Usuários
                </Button>
            </div>

            {assignments.map((item, index) => (
                <div
                    key={index}
                    className="border-l-4 border-blue-600 bg-gray-50 p-4 rounded-md mb-3 space-y-4"
                >
                    <h4 className="text-lg font-semibold mb-2">Grupo {index + 1}</h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label className="mb-1 block">Grupo</Label>
                            <select
                                className="w-full border rounded px-3 py-2 bg-white"
                                value={item.group_id}
                                onChange={(e) =>
                                    handleChange(index, "group_id", e.target.value)
                                }
                                required
                            >
                                <option value="">Selecione um grupo</option>
                                {groupOptions.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <Label className="mb-1 block">Usuários</Label>
                            <MultiSelect
                                options={userOptions}
                                value={item.user_ids}
                                onChange={(val) => handleChange(index, "user_ids", val)}
                                placeholder="Selecione usuários..."
                                className="w-full"
                            />
                        </div>
                    </div>

                    {assignments.length > 1 && (
                        <div className="text-right">
                            <Button
                                type="button"
                                onClick={() => handleRemove(index)}
                                className="bg-red-600 hover:bg-red-700 text-white"
                            >
                                Deletar Grupo de Usuários
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
                Salvar permissões
            </Button>
        </form>
    );
}
