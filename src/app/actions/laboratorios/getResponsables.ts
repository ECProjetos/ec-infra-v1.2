import { createClient } from "@/utils/supabase/client";

export async function GetLabResponsable({ lab_id }: { lab_id: string }) {
    const supabase = createClient()

    const data = supabase
        .from('lab_responsable')
        .select('*')
        .eq('lab_id', lab_id)



    return data;

}