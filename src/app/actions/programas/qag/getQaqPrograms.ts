import { ProgramArraySchema } from "@/app/types/programas/qag";
import { createClient } from "@/utils/supabase/client";

export async function GetPrograms({ asset_id }: { asset_id: string }, { license_id }: { license_id: string }) {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("config_qag")
        .select("*")
        .eq("asset_id", asset_id)
        .eq("license_id", license_id);

    if (error) {
        console.error("Erro ao buscar no Supabase:", error.message);
        return []; // ou lance erro, se preferir
    }

    // data pode ser null quando não há registros
    const parsed = ProgramArraySchema.safeParse(data ?? []);
    if (!parsed.success) {
        console.error("Erro de validação Zod:", parsed.error);
        return []; // ou lance erro
    }
    if (parsed.success) {
        return parsed.data;
    }
}
