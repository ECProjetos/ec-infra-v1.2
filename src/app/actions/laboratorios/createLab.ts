'use server'
import { LaboratorioSchema } from "@/app/types/laboratorios/labs";
import { createClient } from "@/utils/supabase/server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createLab(prevState: any, formData: FormData) {
    const supabase = await createClient()

    const labData = {
        asset_id: formData.get("asset_id"),
        name: formData.get("name"),
        legal_name: formData.get("legal_name"),
        cnpj: formData.get("cnpj"),
        email: formData.get("email"),
        description: formData.get("description"),
        contact: formData.get("contact"),
        public_place: formData.get("public_place"),
        number: formData.get("number"),
        zip_code: formData.get("zip_code"),
        city: formData.get("city"),
        uf: formData.get("uf"),
        responsables: JSON.parse(formData.get("responsables") as string),
    };

    const parsedData = LaboratorioSchema.safeParse(labData);


    if (!parsedData.success) {
        return {
            success: false,
            error: parsedData.error.flatten().fieldErrors,
        };
    }

    const { responsables, ...rest } = parsedData.data;
    console.log('RESiIIOIIIUGH', rest)

    const { data, error } = await supabase.from('lab_infos').insert(rest).select('id').single();

    if (error) {
        return {
            success: false,
            error: error.message,
        };
    }

    const labId = data.id;

    const responsablesData = responsables.map((responsavel) => ({
        ...responsavel,
        lab_id: labId,
    }));

    const { error: responsablesError } = await supabase.from('lab_responsable').insert(responsablesData);

    if (responsablesError) {
        await supabase.from('lab_infos').delete().eq('id', labId);

        return {
            success: false,
            error: responsablesError.message,
        };
    }

    return {
        success: true,
    };
}