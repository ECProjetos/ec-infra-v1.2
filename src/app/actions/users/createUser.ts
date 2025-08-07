'use server';

import { supabaseAdmin } from "@/utils/supabase/admin";
import { CreateUserSchema } from "@/app/types/users/user";

export async function CreateUser(formData: FormData) {
    const data = Object.fromEntries(formData.entries());

    const result = CreateUserSchema.safeParse(data);
    if (!result.success) {
        const errorMsg = result.error.issues[0]?.message ?? "Dados inválidos";
        return { success: false, error: errorMsg };
    }

    const { name, email, senha } = result.data;

    const supabase = await supabaseAdmin;

    // Se usar o sistema de autenticação do Supabase:
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data: user, error } = await supabase.auth.admin.createUser({
        email,
        password: senha,
        user_metadata: { name }
    });

    if (error) {
        return { success: false, error: error.message };
    }

    return { success: true };
}
