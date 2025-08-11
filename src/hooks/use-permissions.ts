"use client";

import { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useUserStore } from "@/stores/userStore";
import { usePermissionStore } from "@/stores/usePermissionStore";
import { useAtivoStore } from "@/stores/useAtivoStore";

export function useUserPermissions() {
    const user_id = useUserStore((s) => s.user?.id);
    const assetId = useAtivoStore((s) => s.ativo?.id);
    const setPermissions = usePermissionStore((s) => s.setPermissions);

    useEffect(() => {
        if (!user_id || !assetId) {
            setPermissions([]); // garante reset quando faltar dependência
            return;
        }

        let isMounted = true;

        const fetchPermissions = async () => {
            const supabase = createClient();

            const { data, error, status } = await supabase
                .from("user_permissions_agg")
                .select("*")
                .eq("user_id", user_id)
                .eq("asset_id", assetId)
                .maybeSingle();

            if (!isMounted) return;

            if (error) {
                console.error("Erro ao buscar permissões:", error);
                setPermissions([]);
                return;
            }

            if (!data || status === 406 || status === 404) {
                setPermissions([]);
                console.log("DEU ERRO")
                return;
            }

            setPermissions(data.permissoes_agrupadas ?? []);
        };

        fetchPermissions();
        return () => {
            isMounted = false;
        };
    }, [user_id, assetId, setPermissions]);
}
