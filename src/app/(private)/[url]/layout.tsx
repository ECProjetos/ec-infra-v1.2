'use client'

import { useAtivoAtual } from "@/hooks/use-ativo";

export default function AtivoLayout({ children }: { children: React.ReactNode }) {
    useAtivoAtual(); // Isso vai buscar e armazenar o ativo atual na store

    return (
        <div>
            {/* Você pode acessar os dados do ativo em qualquer componente */}
            {children}
        </div>
    );
}
