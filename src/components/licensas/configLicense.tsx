import { useActionState, useEffect, useState } from "react";
import MultiSelect from "../ui/multiselect";
import { CreateLicense } from "@/app/actions/licensas/createLicense";
import { toast } from "sonner";
import { useAtivoStore } from "@/stores/useAtivoStore";

const programasOptions = [
    { label: "Programa de Qualidade da Água Superficial", value: "qag" },
    { label: "Programa de Qualidade de Sedimentos", value: "qsd" },
];

const initialState = { success: false, error: null as string | null };


export function ConfigLicensa() {
    const ativoId = useAtivoStore().ativo?.id
    const [state, formAction] = useActionState(
        async (prevState: { success: boolean; error: string | null }, formData: FormData) => {
            return await CreateLicense(formData);
        },
        initialState
    );
    const [programas, setProgramas] = useState<string[]>([]);


    // multiselect
    function handleProgramasChange(values: string[]) {
        setProgramas(values);
    }

    useEffect(() => {
        if (state.success) {
            toast.success("Ativo cadastrado com sucesso!");
        }
        if (state.error) {
            toast.error(`Erro ao cadastrar ativo: ${state.error}`);
        }
    }, [state]);

    return (
        <div>
            <form action={formAction}>
                <div className="p-5 bg-gray-50 rounded-md border-l-4 border-blue-600 space-y-5 flex flex-col">
                    <div className="flex flex-col max-w-sm">
                        <label className="text-md font-semibold mb-3" htmlFor="number">
                            Número
                        </label>
                        <input type="hidden" name="asset_id" value={ativoId} />
                        <input
                            id="number"
                            name="number"
                            className="border-2 p-2 bg-white rounded-sm w-full"
                        />
                    </div>

                    <div className="flex flex-col max-w-sm">
                        <label className="text-md font-semibold mb-3" htmlFor="organ">
                            Órgão
                        </label>
                        <input
                            id="organ"
                            name="organ"
                            className="border-2 p-2 bg-white rounded-sm w-full"
                        />
                    </div>

                    <div className="flex flex-col max-w-sm">
                        <label className="text-md font-semibold mb-3" htmlFor="emission_date">
                            Emissão
                        </label>
                        <input
                            id="emission_date"
                            name="emission_date"
                            type="date"
                            className="border-2 p-2 bg-white rounded-sm w-full"
                        />
                    </div>

                    <div className="flex flex-col max-w-sm">
                        <label className="text-md font-semibold mb-3" htmlFor="due_date">
                            Validade
                        </label>
                        <input
                            id="due_date"
                            name="due_date"
                            type="date"
                            className="border-2 p-2 bg-white rounded-sm w-full"
                        />
                    </div>

                    <div className="flex flex-col max-w-sm">
                        <label className="text-md font-semibold mb-3" htmlFor="programs">
                            Programas necessários para a licença
                        </label>
                        <MultiSelect
                            options={programasOptions}
                            value={programas}
                            onChange={handleProgramasChange}
                            placeholder="Selecione programas..."
                            className="w-full"
                        />
                        {programas.map((programa) => (
                            <input key={programa} type="hidden" name="programs" value={programa} />
                        ))}
                    </div>

                    {/* Se for submeter por <form>, mantenha type="submit" */}
                    <button
                        type="submit"
                        className="bg-blue-600 rounded-md w-[5rem] mt-4 text-white hover:bg-blue-700"
                    >
                        Salvar
                    </button>
                </div>
            </form>
        </div>
    );
}
