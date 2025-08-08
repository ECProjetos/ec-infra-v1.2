// app/actions/permissoes/getUserPermissionsByAsset.ts
'use server';

import { createClient } from "@/utils/supabase/server";

export async function getUserPermissionsByAsset(asset_id: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("user_permission_groups")
        .select("user_id, group_id, permission_groups(group_id, nome)")
        .eq("permission_groups.asset_id", asset_id);

    if (error) {
        console.error(error);
        return [];
    }

    // Agrupar por grupo
    const grouped: Record<string, { group_id: string; user_ids: string[] }> = {};

    for (const row of data) {
        const group_id = row.group_id;
        if (!grouped[group_id]) {
            grouped[group_id] = {
                group_id,
                user_ids: [],
            };
        }
        grouped[group_id].user_ids.push(row.user_id);
    }

    return Object.values(grouped);
}
