import { createClient } from "@/utils/supabase/client";

export async function GetLabs({ asset_id }: { asset_id: string }) {
    const supabase = createClient()

    const data = supabase
        .from('lab_infos')
        .select('*')
        .eq('asset_id', asset_id)



    return data;

}