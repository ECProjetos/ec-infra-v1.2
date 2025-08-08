import { PermissionGroupsArraySchema } from "@/app/types/permissions/groups";
import { createClient } from "@/utils/supabase/client";

export async function getGroups({ asset_id }: { asset_id: string }) {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('permission_groups')
        .select('*')
        .eq('asset_id', asset_id);

    if (error) {
        console.error("Erro ao buscar grupos:", error);
        return [];
    }

    // Agora valide o array de grupos!
    const parsed = PermissionGroupsArraySchema.safeParse(data);

    if (!parsed.success) {
        console.error(parsed.error.issues);
        return [];
    }

    return parsed.data; // array de grupos
}
