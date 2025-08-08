"use client";

import { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useUserStore } from "@/stores/userStore";
import { usePermissionStore } from "@/stores/usePermissionStore";
import { useAtivoStore } from "@/stores/useAtivoStore";

export function useUserPermissions() {
    const user_id = useUserStore((state) => state.user?.id);
    console.log("USER PARA PERMISSION", user_id)
    const assetId = useAtivoStore((state) => state.ativo?.id);
    console.log("ASSET PARA PERMISSION", assetId)

    const setPermissions = usePermissionStore((state) => state.setPermissions);

    useEffect(() => {
        if (!user_id || !assetId) return;

        const fetchPermissions = async () => {
            const supabase = createClient();

            const { data } = await supabase
                .from("user_permissions_flattened")
                .select("permissoes_agrupadas")
                .eq("user_id", user_id)
                .eq("asset_id", assetId)
                .single();

            if (data?.permissoes_agrupadas) {
                setPermissions(data.permissoes_agrupadas);
            } else {
                setPermissions([]);
            }
        };

        fetchPermissions();
    }, [user_id, assetId, setPermissions]);
}
