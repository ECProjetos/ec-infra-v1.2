/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { createClient } from "@/utils/supabase/server";
import { AtivoCreationSchema } from "@/app/types/ativos/ativos";

export async function CreateAtivo(formData: FormData): Promise<any> {
    // Converte FormData para objeto
    const data = Object.fromEntries(formData.entries());

    console.log("Dados recebidos:", data);

    // Valida com Zod
    const result = AtivoCreationSchema.safeParse(data);
    if (!result.success) {
        console.error("Erro de validação:", result.error.flatten());
        return { success: false, error: "Dados inválidos" };
    }

    const values = result.data;

    // Insere no Supabase
    const supabase = await createClient();
    const { error } = await supabase.from("assets").insert([values]);

    if (error) {
        console.error("Erro ao inserir no Supabase:", error.message);
        return { success: false, error: error.message };
    }

    return { success: true };
}




export async function getAtivos({ user_id }: { user_id: string }) {
    const supabase = await createClient();
    console.log(user_id)
    const { data, error } = await supabase.from("assets").select("*").eq('user_id', user_id);
    console.log(data)

    if (error) {
        console.error("Erro ao buscar ativos:", error.message);
        return [];
    }

    return data;
}