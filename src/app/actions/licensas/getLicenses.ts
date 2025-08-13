import { LicenseSchemaArray } from "@/app/types/licensas/license";
import { createClient } from "@/utils/supabase/client";

export async function GetLicenses({ asset_id }: { asset_id: string }) {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("licenses")
        .select("*")
        .eq("asset_id", asset_id);

    if (error) {
        console.error("Erro ao buscar no Supabase:", error.message);
        return []; // ou lance erro, se preferir
    }

    // data pode ser null quando não há registros
    const parsed = LicenseSchemaArray.safeParse(data ?? []);
    if (!parsed.success) {
        console.error("Erro de validação Zod:", parsed.error);
        return []; // ou lance erro
    }
    if (parsed.success) {
        return parsed.data;
    }
}
