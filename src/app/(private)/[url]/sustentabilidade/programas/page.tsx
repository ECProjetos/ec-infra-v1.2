'use client';

import { ProgramaQag } from "@/components/programas/qag";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { GetLicenses } from "@/app/actions/licensas/getLicenses";
import { useAtivoStore } from "@/stores/useAtivoStore";
import { LicenseSchemaArrayType, LicenseSchemaType } from "@/app/types/licensas/license";

export default function SustentabilidadeDashboard() {
    const [formCategory, setFormCategory] = useState('');
    const [licenses, setLicenses] = useState<LicenseSchemaArrayType>();
    const ativoId = useAtivoStore().ativo?.id
    const [selectedLicense, setLicense] = useState<LicenseSchemaType>();
    const programs = selectedLicense?.programs


    function handleTypeChange(event: React.ChangeEvent<HTMLSelectElement>) {
        setFormCategory(event.target.value)

    }
    useEffect(() => {
        if (!ativoId) return;
        (async () => {
            const licenses = await GetLicenses({ asset_id: ativoId });
            setLicenses(licenses);
        })();
    }, [ativoId]);


    function renderFormByCategory(category: string) {
        switch (category) {
            case 'qag':
                return <ProgramaQag />;
            default:
                return null;
        }
    }

    return (
        <form className="px-15 py-10 ">
            <input type="hidden" name="asset_id" value={ativoId} />
            <input type="hiden" name="license_id" value={selectedLicense?.id} />
            <div className="mb-5">
                <h1 className="font-bold text-2xl">Cadastro de Planos e Programas</h1>
                <p className="py-2 text-gray-600">Interface dinâmica e completa para criação de P&P</p>
            </div>
            <div className=" bg-gray-50 p-5 rounded-md border-l-4 border-blue-600 shadow-md mb-3">
                <select
                    className="bg-white p-2 border-1 rounded-md"
                    onChange={e => {
                        const selectedId = e.target.value;
                        const selectedLicense = licenses?.find(l => l.id === selectedId);
                        setLicense(selectedLicense);
                    }}
                >
                    <option value="">Selecione a Licensa</option>
                    {licenses?.map((license, idx) => (
                        <option key={license.id ?? idx} value={license.id}>
                            {license.number} - {license.organ}
                        </option>
                    ))}
                </select>
            </div>
            <div className=" bg-gray-50 p-5 rounded-md border-l-4 border-blue-600 shadow-md ">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Tipo do Programa */}
                    <div className="flex flex-col">
                        <label className="font-semibold">Tipo do Programa</label>
                        <select
                            className="border rounded-md p-2 w-full bg-white"
                            onChange={handleTypeChange}
                            name="program_type"
                        >
                            <option value={''}>Selecione um programa</option>
                            {programs?.map((program, idx) => (
                                <option key={idx} className="py-1 text-sm text-gray-700">
                                    {program}
                                </option>
                            ))}
                        </select>

                    </div>

                    {/* Nome */}
                    <div className="flex flex-col">
                        <label className="font-semibold">Nome</label>
                        <input
                            className="rounded-md bg-white p-2 border"
                            name="name"
                            placeholder="Nome do plano/Programa"
                        />
                    </div>

                    {/* Código */}
                    <div className="flex flex-col">
                        <label className="font-semibold">Código</label>
                        <input
                            className="rounded-md bg-white p-2 border"
                            name="code"
                            placeholder="Ex: PMA-001"
                        />
                    </div>

                    {/* Descrição - ocupa as 3 colunas no desktop */}
                    <div className="flex flex-col md:col-span-3">
                        <label className="font-semibold">Descrição</label>
                        <textarea
                            className="bg-white w-full mt-2 border rounded-md p-2"
                            rows={4}
                            placeholder="Descreva os objetivos e escopo do plano/programa"
                            name="description"
                        ></textarea>
                    </div>
                </div>
            </div>
            {renderFormByCategory(formCategory)}
            <div className="flex justify-end">
                <Button className="bg-blue-600 mt-5 hover:bg-blue-700" type="submit">
                    Salvar
                </Button>
            </div>
        </form >
    )
}