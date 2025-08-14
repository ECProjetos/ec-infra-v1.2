'use client';

import { GetLicenses } from "@/app/actions/licensas/getLicenses";
import { GetPrograms } from "@/app/actions/programas/qag/getQaqPrograms";
import { LicenseSchemaArrayType } from "@/app/types/licensas/license";
import { ProgramArrayType } from "@/app/types/programas/qag";
import { FormQag } from "@/components/programas/qag/formQag";
import { useAtivoStore } from "@/stores/useAtivoStore";
import { useEffect, useState } from "react"

export default function ColetaPage() {
    const [licenses, setLicenses] = useState<LicenseSchemaArrayType>();
    const [programs, setPrograms] = useState<ProgramArrayType>([]);
    const [selectedLicenseId, setLicenseId] = useState('');
    const ativoId = useAtivoStore().ativo?.id
    const [selectedProgramCategory, setProgramCategory] = useState('');

    useEffect(() => {
        if (!ativoId) return;
        (async () => {
            const licenses = await GetLicenses({ asset_id: ativoId });
            setLicenses(licenses);
        })();
    }, [ativoId]);

    useEffect(() => {
        if (!ativoId || !selectedLicenseId) return;
        (async () => {
            const programs = await GetPrograms({ asset_id: ativoId }, { license_id: selectedLicenseId });
            setPrograms(programs ?? []);
        })();
    }, [ativoId, selectedLicenseId]);

    function renderFormByCategory(category: string) {
        switch (category) {
            case 'qag':
                return <FormQag />;
            default:
                return null;
        }
    }


    return (
        <div className="px-15 py-10">
            <div className="bg-gray-50 rounded-md border-l-4 border-blue-600 shadow-md p-6">
                <label className="m-3 font-semibold">Selecione a Licensa:</label>
                <select
                    className="bg-white p-1 border-b-1 border-blue-600 rounded-md"
                    onChange={e => {
                        const selectedId = e.target.value;
                        setLicenseId(selectedId)
                    }}
                >
                    <option value="">Selecione a Licensa</option>
                    {licenses?.map((license, idx) => (
                        <option key={license.id ?? idx} value={license.id}>
                            {license.number} - {license.organ}
                        </option>
                    ))}
                </select>
                <div>
                    <label className="m-3 font-semibold">Selecione o Programa:</label>
                    <select
                        className="bg-white p-1 border-b-1 border-blue-600 rounded-md mt-3"
                        onChange={e => {
                            const selectedProgramCategory = e.target.value;
                            setProgramCategory(selectedProgramCategory)
                        }}
                    >
                        <option value="">Selecione o Programa</option>
                        {programs?.map((program, idx) => (
                            <option key={program.id ?? idx} value={program.program_category}>
                                {program.name} - {program.code}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            {renderFormByCategory(selectedProgramCategory)}
        </div>
    )
}