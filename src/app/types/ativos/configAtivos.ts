// src/app/types/ativos/configAtivos.ts
import { z } from "zod";

export const ConfigAtivoSchema = z.object({
    terminalName: z.string().min(1, "Nome obrigatório"),
    terminalCode: z.string().min(1, "Código obrigatório"),
    portLocation: z.string().min(1, "Porto obrigatório"),
    inaugurationDate: z.string().optional(),
    operationalStatus: z.string().optional(),
    systemStatus: z.string().optional(),

    cnpj: z.string().optional(),
    corporateName: z.string().optional(),
    licenseNumber: z.string().optional(),
    issuingAgency: z.string().optional(),
    licenseValidity: z.string().optional(),
    ispsCertification: z.string().optional(),
    explorationRegime: z.string().optional(),
    contractTerm: z.string().optional(),

    totalArea: z.string().optional(),
    mainCargoTypes: z.string().optional(),
    expansionProjects: z.string().optional(),
    generalNotes: z.string().optional(),

    // Repetidores vêm como JSON string
    berths: z.string().optional(),
    infrastructure: z.string().optional(),
    equipment: z.string().optional(),
});
