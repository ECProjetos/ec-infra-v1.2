"use server";

import { createClient } from "@/utils/supabase/server";
import { CreateFormQualidadeDaAguaSuperficial } from "@/app/types/programas/qag_form";

export async function uploadFiles(
    files: File[] | undefined,
    folder: string
): Promise<string[]> {
    const supabase = await createClient();
    if (!files) return [];

    const uploads = await Promise.all(
        files.map(async (file) => {
            const path = `${folder}/${Date.now()}_${file.name}`;

            // Upload
            const { error: upErr } = await supabase.storage
                .from("qualidade-agua-superficial")
                .upload(path, file, { cacheControl: "3600", upsert: false });
            if (upErr) throw upErr;

            // Get public URL
            const { data } = supabase.storage
                .from("qualidade-agua-superficial")
                .getPublicUrl(path);

            // data.publicUrl sempre existe
            return data.publicUrl;
        })
    );

    return uploads;
}

export async function createQualidadeAguaSuperficial(
    form: CreateFormQualidadeDaAguaSuperficial
) {
    const supabase = await createClient();

    const laudoUrls = await uploadFiles(
        form.laudos,
        `laudos/${form.user_id}`
    );
    const registroFotograficoSondasUrls = await uploadFiles(
        form.registros_fotograficos_sondas,
        `sondas/${form.user_id}`
    );
    const registroFotograficoAmostradoresUrls = await uploadFiles(
        form.registros_fotograficos_amostradores,
        `amostradores/${form.user_id}`
    );
    const registroFotograficoCaixasTermicasUrls = await uploadFiles(
        form.registros_fotograficos_caixas_termicas,
        `caixas_termicas/${form.user_id}`
    );
    const registroFotograficoOutrosUrls = form.registros_fotograficos_outros
        ? await uploadFiles(
            form.registros_fotograficos_outros,
            `outros/${form.user_id}`
        )
        : null;

    const payload = {
        user_id: form.user_id,
        ativo_id: form.ativo_id,
        campanha_de_coleta: form.campanha_de_coleta,
        periodicidade_da_analise: form.periodicidade_da_analise,
        nome_laboratorio: form.nome_laboratorio,
        razao_social_laboratorio: form.razao_social_laboratorio,
        cnpj_laboratorio: form.cnpj_laboratorio,
        endereco_laboratorio: form.endereco_laboratorio,
        responsavel_tecnico: form.responsavel_tecnico,
        email: form.email,
        contato: form.contato,
        resultados: form.resultados,
        registros_fotograficos_sondas: registroFotograficoSondasUrls,
        registros_fotograficos_amostradores: registroFotograficoAmostradoresUrls,
        registros_fotograficos_caixas_termicas: registroFotograficoCaixasTermicasUrls,
        registros_fotograficos_outros: registroFotograficoOutrosUrls,
        laudos: laudoUrls,
    };

    const { data, error } = await supabase
        .from("superficial_water_quality_form")
        .insert([payload]);

    if (error) {
        console.error("Erro ao inserir formulário:", error);
        throw error;
    }
    return data;

}