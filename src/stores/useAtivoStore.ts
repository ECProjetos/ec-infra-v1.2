import { create } from "zustand";
import { AtivoCreationType } from "@/app/types/ativos/ativos";

interface AtivoState {
    ativo: AtivoCreationType | null;
    setAtivo: (ativo: AtivoCreationType) => void;
    clearAtivo: () => void;
}

export const useAtivoStore = create<AtivoState>((set) => ({
    ativo: null,
    setAtivo: (ativo) => set({ ativo }),
    clearAtivo: () => set({ ativo: null }),
}));
