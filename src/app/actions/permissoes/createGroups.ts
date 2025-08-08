'use server';

import { createClient } from "@/utils/supabase/server";
import { PermissionGroupsBulkCreateSchema } from "@/app/types/permissions/groups";

export async function CreatePermissionGroup(formData: FormData) {
    // Transforma FormData em objeto
    const data = Object.fromEntries(formData.entries());

    // Validação com Zod
    const result = PermissionGroupsBulkCreateSchema.safeParse(data);

    if (!result.success) {
        return { success: false, error: result.error?.message ?? "Dados inválidos" };
    }

    const { asset_id, groups } = result.data;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rows = groups.map((g: any) => ({
        group_id: crypto.randomUUID(), // ou use uuid lib
        asset_id,
        ...g
    }));
    const supabase = await createClient();


    const { error } = await supabase.from("permission_groups").insert(rows);

    if (error) {
        return { success: false, error: error.message };
    }

    return { success: true };
}

