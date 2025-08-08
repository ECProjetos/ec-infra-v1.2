// app/actions/auth/logoutClient.ts
"use client";

import { createClient } from "@/utils/supabase/client";

export async function logoutClient() {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.error("Erro ao fazer logout:", error.message);
        throw new Error("Erro ao sair");
    }

    // Redirecionar para login, se quiser
    window.location.href = "/login";
}
