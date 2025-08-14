// app/actions/programas/qag/sendQagForm.ts
"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

type SuperficialWaterQualityFormPayload = {
    user_id: string | null;
    ativo_id: string | null;
    campanha_de_coleta: string | null;
    periodicidade_da_analise: string | null;
    nome_laboratorio: string | null;
    razao_social_laboratorio: string | null;
    cnpj_laboratorio: string | null;
    endereco_laboratorio: string | null;
    responsavel_tecnico: string | null;
    email: string | null;
    contato: string | null;
    resultados: string | null;
    registros_fotograficos_sondas: string[];
    registros_fotograficos_amostradores: string[];
    registros_fotograficos_caixas_termicas: string[];
    registros_fotograficos_outros: string[] | null;
    laudos: string[];
};

export async function createQualidadeAguaSuperficial(formData: FormData) {
    console.log("ENTROUUUUUUUUUUUUUUUUUUUUU")
    const supabase = await createClient();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parseJSON = <T = any>(name: string): T | null => {
        const raw = formData.get(name) as string | null;
        if (!raw) return null;
        try { return JSON.parse(raw); } catch { return null; }
    };

    const payload: SuperficialWaterQualityFormPayload = {
        user_id: formData.get("user_id") as string | null,
        ativo_id: formData.get("ativo_id") as string | null,
        campanha_de_coleta: formData.get("campanha_de_coleta") as string | null,
        periodicidade_da_analise: formData.get("periodicidade_da_analise") as string | null,
        nome_laboratorio: formData.get("nome_laboratorio") as string | null,
        razao_social_laboratorio: formData.get("razao_social_laboratorio") as string | null,
        cnpj_laboratorio: formData.get("cnpj_laboratorio") as string | null,
        endereco_laboratorio: formData.get("endereco_laboratorio") as string | null,
        responsavel_tecnico: formData.get("responsavel_tecnico") as string | null,
        email: formData.get("email") as string | null,
        contato: formData.get("contato") as string | null,

        // CSV processado no client (salvar como JSON/text)
        resultados: formData.get("resultados_json") as string | null,

        // URLs geradas no client
        registros_fotograficos_sondas: parseJSON<string[]>("registros_fotograficos_sondas") ?? [],
        registros_fotograficos_amostradores: parseJSON<string[]>("registros_fotograficos_amostradores") ?? [],
        registros_fotograficos_caixas_termicas: parseJSON<string[]>("registros_fotograficos_caixas_termicas") ?? [],
        registros_fotograficos_outros: parseJSON<string[]>("registros_fotograficos_outros"),
        laudos: parseJSON<string[]>("laudos") ?? [],
    };

    const { error } = await supabase
        .from("superficial_water_quality_form")
        .insert([payload]);

    if (error) {
        console.error("Erro ao inserir formulário:", error);
        return { success: false, error: error.message };
    }

    revalidatePath("/programas/qag");
    return { success: true, error: null };
}
