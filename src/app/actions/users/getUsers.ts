'use server';

import { supabaseAdmin } from "@/utils/supabase/admin";

export async function getUsers() {
    console.log('ENTROU USUARIOS')
    const supabase = supabaseAdmin;
    const { data, error } = await supabase.auth.admin.listUsers();
    if (error) throw error;
    console.log("USERS", data.users)
    return data.users;
}
