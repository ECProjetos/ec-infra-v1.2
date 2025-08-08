'use server';

import { createClient } from "@/utils/supabase/server";
import { z } from "zod";

// Validação do array de relacionamentos
const userGroupArraySchema = z.array(
    z.object({
        group_id: z.string(),
        user_ids: z.array(z.string()).min(1),
    })
);

export async function createUserPermission(formData: FormData) {
    const raw = formData.get("users");

    if (!raw) {
        return { success: false, error: "Dados não encontrados no formulário." };
    }

    const parsed = userGroupArraySchema.safeParse(JSON.parse(raw as string));

    if (!parsed.success) {
        return {
            success: false,
            error: parsed.error?.message ?? "Erro na validação dos dados.",
        };
    }

    const supabase = await createClient();

    // Gerar lista de { user_id, group_id }
    const records = parsed.data.flatMap(({ group_id, user_ids }) =>
        user_ids.map((user_id) => ({
            group_id,
            user_id,
        }))
    );

    // Inserir todos de uma vez (batch insert)
    const { error } = await supabase
        .from("user_permission_groups")
        .upsert(records, { onConflict: "user_id,group_id" });

    if (error) {
        return { success: false, error: error.message };
    }

    return { success: true };
}
