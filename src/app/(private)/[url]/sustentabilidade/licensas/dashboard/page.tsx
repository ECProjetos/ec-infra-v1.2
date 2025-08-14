'use client'

import { GetLicenses } from "@/app/actions/licensas/getLicenses";
import { LicenseSchemaArrayType } from "@/app/types/licensas/license";
import { LicensaDashCards } from "@/components/licensas/dashCards";
import { CadastrarLicensa } from "@/components/licensas/licensaForm";
import { Skeleton } from "@/components/ui/skeleton";
import { useAtivoStore } from "@/stores/useAtivoStore";
import { Star, Check, TriangleAlert, ListCheck } from "lucide-react";
import { useEffect, useState } from "react";

export default function LicensaPage() {
    const [licenses, setLicenses] = useState<LicenseSchemaArrayType>();
    const ativoId = useAtivoStore().ativo?.id
    const totalLicensas = licenses?.length



    useEffect(() => {
        if (!ativoId) return;
        (async () => {
            const licenses = await GetLicenses({ asset_id: ativoId });
            setLicenses(licenses);
        })();
    }, [ativoId]);

    return (
        (totalLicensas) ?
            <div className="px-15 py-10 space-y-5">
                <div>
                    <h1 className="font-semibold text-2xl">Gestão de Licenças Ambientais</h1 >
                    <p className="text-gray-500 muted">Gestão completa e acompanhamento de conformidade</p>
                </div >
                <div className="flex gap-3">
                    <LicensaDashCards title="Total de Licensas" value={String(totalLicensas)} color="blue" icon={<Star color="blue" width={52} height={36} />} />
                    <LicensaDashCards title="Em Conformidade" value="6" color="green" icon={<Check color="green" width={52} height={36} />} />
                    <LicensaDashCards title="Atenção Requerida" value="8" color="orange" icon={<TriangleAlert color="orange" width={52} height={36} />} />
                    <LicensaDashCards title="Condicionantes" value="24" color="purple" icon={<ListCheck color="purple" width={52} height={36} />} />
                </div>

                <CadastrarLicensa />
            </div > : (<Skeleton />)
    )
}