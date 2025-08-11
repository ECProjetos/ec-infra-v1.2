'use server';


import { supabaseAdmin } from "@/utils/supabase/admin";
import { createClient } from "@/utils/supabase/server";

export async function getUsers() {
    console.log('ENTROU USUARIOS');

    const supabase = await createClient()

    const { data: { user: currentUser }, error: currentUserError } = await supabase.auth.getUser();
    if (currentUserError) throw currentUserError;

    // Lista todos os usuários pelo admin
    const { data, error } = await supabaseAdmin.auth.admin.listUsers();
    if (error) throw error;

    let users = data.users;

    // Adiciona o usuário atual se ele não estiver já na lista
    if (currentUser && !users.find(u => u.id === currentUser.id)) {
        users = [...users, currentUser];
    }

    console.log("USERS", users);
    return users;
}
