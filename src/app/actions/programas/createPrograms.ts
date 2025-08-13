/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProgramSchema } from "@/app/types/programas/program";
import { createClient } from "@/utils/supabase/client";

export async function CreateProgram(formData: FormData): Promise<any> {
    const entries = formData.entries()
    const base = Object.fromEntries(entries);
    const result = ProgramSchema.safeParse(base);
    if (!result.success) {
        console.error("Erro de validação:", result.error);
        return { success: false, error: "Dados inválidos" };
    }

    const supabase = createClient();

    const { error } = await supabase.from("config_qag").insert([result.data]);

    if (error) {
        console.error("Erro ao inserir no Supabase:", error.message);
        return { success: false, error: error.message };
    }

    return { success: true };
}
