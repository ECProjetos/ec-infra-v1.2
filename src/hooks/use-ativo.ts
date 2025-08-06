"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAtivoStore } from "@/stores/useAtivoStore";
import { createClient } from "@/utils/supabase/client";

export function useAtivoAtual() {
    const pathname = usePathname();
    const slug = pathname.split("/")[1]; // ex: 'porto-rio'

    const setAtivo = useAtivoStore((state) => state.setAtivo);

    useEffect(() => {
        if (!slug) return;

        const fetchAtivo = async () => {
            const supabase = createClient();

            const { data, error } = await supabase
                .from("assets")
                .select("*")
                .eq("url", slug)
                .single();

            if (error) {
                console.error("Erro ao buscar ativo:", error.message);
                return;
            }

            if (data) {
                setAtivo(data); // Armazena na store global
            }
        };

        fetchAtivo();
    }, [slug, setAtivo]);
}
