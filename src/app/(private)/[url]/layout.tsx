'use client'

import { useAtivoAtual } from "@/hooks/use-ativo";
import { usePermissionStore } from "@/stores/usePermissionStore";

export default function AtivoLayout({ children }: { children: React.ReactNode }) {
    useAtivoAtual();
    usePermissionStore()
    console.log(usePermissionStore())

    return (
        <div>
            {children}
        </div>
    );
}
