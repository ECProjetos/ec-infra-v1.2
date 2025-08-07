/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { createClient } from "@/utils/supabase/server";
import { ConfigAtivoSchema } from "@/app/types/ativos/configAtivos";

export async function ConfigAtivo(formData: FormData): Promise<any> {
    const data = Object.fromEntries(formData.entries());

    // 1. Validate the form data
    const result = ConfigAtivoSchema.safeParse(data);
    if (!result.success) {
        console.error("Validation error:", result.error.flatten());
        return { success: false, error: "Invalid form data" };
    }

    const values = result.data;

    // 2. Map camelCase to snake_case for DB
    const terminalValues = {
        id: values.id,
        terminal_name: values.terminalName,
        terminal_code: values.terminalCode,
        port_location: values.portLocation,
        inauguration_date: values.inaugurationDate,
        operational_status: values.operationalStatus,
        system_status: values.systemStatus,

        cnpj: values.cnpj,
        corporate_name: values.corporateName,
        license_number: values.licenseNumber,
        issuing_agency: values.issuingAgency,
        license_validity: values.licenseValidity,
        isps_certification: values.ispsCertification,
        exploration_regime: values.explorationRegime,
        contract_term: values.contractTerm,

        total_area: values.totalArea,
        main_cargo_types: values.mainCargoTypes,
        expansion_projects: values.expansionProjects,
        general_notes: values.generalNotes,
    };

    // 3. Connect to Supabase
    const supabase = await createClient();

    // 4. Insert terminal data
    const { data: insertedTerminal, error: terminalError } = await supabase
        .from("port_terminals")
        .insert([terminalValues])
        .select("id")
        .single();

    if (terminalError || !insertedTerminal?.id) {
        return { success: false, error: terminalError?.message || "Insert failed" };
    }

    const terminalId = insertedTerminal.id;

    // 5. Parse & insert repeaters (berths, infrastructure, equipment)
    const parseAndInsertList = async (
        raw: string | undefined,
        table: "berths" | "infrastructure" | "equipment"
    ) => {
        if (!raw) return;

        try {
            const parsed = JSON.parse(raw);
            // Suporte para .itens (pt-BR) ou .items (en-US)
            const items = Array.isArray(parsed)
                ? parsed
                : parsed.itens || parsed.items || [];

            if (!Array.isArray(items) || items.length === 0) return;

            // Aqui, se necessário, adapte os campos do frontend para os do banco:
            const toSnake = (obj: any) => {
                // berths: nome, comprimento, calado --> name, length, draft
                if (table === "berths") {
                    return {
                        name: obj.nome || obj.name || "",
                        length: obj.comprimento || obj.length || "",
                        draft: obj.calado || obj.draft || "",
                        terminal_id: terminalId,
                    };
                }
                // infrastructure: tipo, descricao, quantidade, capacidade, unidade
                if (table === "infrastructure") {
                    return {
                        type: obj.tipo || obj.type || "",
                        description: obj.descricao || obj.description || "",
                        quantity: obj.quantidade || obj.quantity || "",
                        capacity: obj.capacidade || obj.capacity || "",
                        unit: obj.unidade || obj.unit || "",
                        terminal_id: terminalId,
                    };
                }
                // equipment: tipo, modelo, quantidade, capacidade, unidade, descricao
                if (table === "equipment") {
                    return {
                        type: obj.tipo || obj.type || "",
                        model: obj.modelo || obj.model || "",
                        quantity: obj.quantidade || obj.quantity || "",
                        capacity: obj.capacidade || obj.capacity || "",
                        unit: obj.unidade || obj.unit || "",
                        description: obj.descricao || obj.description || "",
                        terminal_id: terminalId,
                    };
                }
                return { ...obj, terminal_id: terminalId };
            };

            const withFk = items.map(toSnake);

            const { error } = await supabase.from(table).insert(withFk);
            if (error) {
                console.error(`Failed to insert into ${table}:`, error.message);
            }
        } catch (err) {
            console.error(`Error parsing JSON for ${table}:`, err);
        }
    };

    await Promise.all([
        parseAndInsertList(data.berths as string, "berths"),
        parseAndInsertList(data.infrastructure as string, "infrastructure"),
        parseAndInsertList(data.equipment as string, "equipment"),
    ]);

    return { success: true };
}
