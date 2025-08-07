'use client'

import { useAtivoAtual } from "@/hooks/use-ativo";

export default function AtivoLayout({ children }: { children: React.ReactNode }) {
    useAtivoAtual();

    return (
        <div>
            {/* Você pode acessar os dados do ativo em qualquer componente */}
            {children}
        </div>
    );
}
