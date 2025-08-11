'use client'

import { useAtivoAtual } from "@/hooks/use-ativo";
import { useUserPermissions } from "@/hooks/use-permissions";

export default function AtivoLayout({ children }: { children: React.ReactNode }) {
    useAtivoAtual();
    useUserPermissions()

    return (
        <div>
            {children}
        </div>
    );
}
