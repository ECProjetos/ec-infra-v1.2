/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProgramSchema } from "@/app/types/programas/qag";
import { createClient } from "@/utils/supabase/client";

export async function CreateProgram(formData: FormData): Promise<any> {
    const base: Record<string, any> = Object.fromEntries(formData);

    // Parse JSON strings for points_location and periodicity_parameters
    if (typeof base.points_location === 'string') {
        try {
            base.points_location = JSON.parse(base.points_location);
        } catch (e) {
            console.error("Failed to parse points_location:", e);
            return { success: false, error: "Invalid points_location data" };
        }
    }

    if (typeof base.periodicity_parameters === 'string') {
        try {
            base.periodicity_parameters = JSON.parse(base.periodicity_parameters);
        } catch (e) {
            console.error("Failed to parse periodicity_parameters:", e);
            return { success: false, error: "Invalid periodicity_parameters data" };
        }
    }

    const result = ProgramSchema.safeParse(base);
    if (!result.success) {
        console.error("Erro de validação:", result.error);
        return { success: false, error: result.error.message };
    }

    const supabase = createClient();

    const { error } = await supabase.from("config_qag").insert([result.data]);

    if (error) {
        console.error("Erro ao inserir no Supabase:", error.message);
        return { success: false, error: error.message };
    }

    return { success: true };
}
