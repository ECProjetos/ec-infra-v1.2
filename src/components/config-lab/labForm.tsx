'use client';

import { createLab } from "@/app/actions/laboratorios/createLab";
import { useAtivoStore } from "@/stores/useAtivoStore";
import ResponsaveisTecnicos from "./responsables";
import { useActionState, useEffect } from "react";

export function LabForm() {
    type ActionState = {
        success: boolean;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        error?: any;
    };


    const [state, formAction] = useActionState<ActionState, FormData>(
        createLab,
        { success: false }

    );
    const ativoId = useAtivoStore().ativo?.id

    useEffect(() => {
        if (state.success) {
            console.log("Laboratório criado com sucesso!");
        }
        if (!state.success) {
            console.log(state.error)
        }
    }, [state.success, state.error]);

    return (
        <form action={formAction}>
            <div className="rounded-md bg-gray-50 border-l-4 border-blue-600 p-3 md:p-5">
                <h1 className="text-2xl font-bold py-2">Novo laboratório</h1>

                {typeof state.error === 'string' && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <strong className="font-bold">Erro!</strong>
                        <span className="block sm:inline"> {state.error}</span>
                    </div>
                )}


                {/* GRID */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    {/* Nome */}
                    <input type="hidden" name="asset_id" value={ativoId} />
                    <Field label="Nome" required className="md:col-span-4" error={state.error?.name?.[0]}>
                        <input
                            name="name"
                            placeholder="Nome do laboratório"
                            className="w-full bg-white border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                            required
                        />
                    </Field>

                    {/* Razão Social */}
                    <Field label="Razão Social" required className="md:col-span-5" error={state.error?.legal_name?.[0]}>
                        <input
                            name="legal_name"
                            placeholder="Razão social do laboratório"
                            className="w-full bg-white border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                            required
                        />
                    </Field>

                    {/* CNPJ */}
                    <Field label="CNPJ" required className="md:col-span-3" error={state.error?.cnpj?.[0]}>
                        <input
                            name="cnpj"
                            inputMode="numeric"
                            placeholder="00.000.000/0000-00"
                            className="w-full bg-white border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                            required
                        />
                    </Field>

                    {/* Email */}
                    <Field label="Email" required className="md:col-span-6" error={state.error?.email?.[0]}>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email do laboratório"
                            className="w-full bg-white border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                            required
                        />
                    </Field>

                    {/* Descrição */}
                    <Field label="Descrição" required className="md:col-span-6" error={state.error?.description?.[0]}>
                        <textarea
                            name="description"
                            placeholder="Descrição do laboratório"
                            className="w-full bg-white border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                            required
                        />
                    </Field>

                    {/* Contato */}
                    <Field label="Contato" required className="md:col-span-6" error={state.error?.contact?.[0]}>
                        <input
                            type="tel"
                            name="contact"
                            placeholder="Contato do laboratório"
                            className="w-full bg-white border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                            required
                        />
                    </Field>

                    {/* Logradouro */}
                    <Field label="logradouro" required className="md:col-span-6" error={state.error?.public_place?.[0]}>
                        <input
                            name="public_place"
                            placeholder="Nome logradouro"
                            className="w-full bg-white border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                            required
                        />
                    </Field>

                    {/* CEP */}
                    <Field label="CEP" required className="md:col-span-6" error={state.error?.zip_code?.[0]}>
                        <input
                            name="zip_code"
                            inputMode="numeric"
                            placeholder="00000-000"
                            className="w-full bg-white border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                            required
                        />
                    </Field>

                    {/* Cidade */}
                    <Field label="Cidade" required className="md:col-span-9" error={state.error?.city?.[0]}>
                        <input
                            name="city"
                            placeholder="Nome da cidade"
                            className="w-full bg-white border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                            required
                        />
                    </Field>

                    {/* Estado */}
                    <Field label="Estado" required className="md:col-span-3" error={state.error?.uf?.[0]}>
                        <input
                            name="uf"
                            maxLength={2}
                            placeholder="UF"
                            className="w-full bg-white border rounded-md px-3 py-2 text-sm uppercase focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                            required
                        />
                    </Field>

                    {/* Número */}
                    <Field label="Número" className="md:col-span-6" error={state.error?.number?.[0]}>
                        <input
                            name="number"
                            placeholder="Número do endereço"
                            className="w-full bg-white border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                        />
                    </Field>


                </div>
                <ResponsaveisTecnicos />
                <div className="mt-6 flex items-center gap-3">

                    <button
                        type="submit"
                        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                    >
                        Salvar
                    </button>
                </div>
            </div>
        </form>
    );
}

/** Rótulo + children com mesmo estilo de input */
function Field({
    label,
    required,
    className,
    children,
    error
}: {
    label: string;
    required?: boolean;
    className?: string;
    children: React.ReactNode;
    error?: string;
}) {
    return (
        <div className={className}>
            <label className="mb-1 block text-sm font-medium text-gray-700">
                {label} {required && <span className="text-red-600">*</span>}
            </label>
            {children}
            {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
        </div>
    );
}