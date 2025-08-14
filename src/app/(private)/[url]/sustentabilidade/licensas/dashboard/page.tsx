import { LicensaDashCards } from "@/components/licensas/dashCards";
import { CadastrarLicensa } from "@/components/licensas/licensaForm";
import { Star, Check, TriangleAlert, ListCheck } from "lucide-react";

export default function LicensaPage() {
    return (
        <div className="px-15 py-10 space-y-5">
            <div>
                <h1 className="font-semibold text-2xl">Gestão de Licenças Ambientais</h1>
                <p className="text-gray-500 muted">Gestão completa e acompanhamento de conformidade</p>
            </div>
            <div className="flex gap-3">
                <LicensaDashCards title="Total de Licensas" value="8" color="blue" icon={<Star color="blue" width={52} height={36} />} />
                <LicensaDashCards title="Em Conformidade" value="6" color="green" icon={<Check color="green" width={52} height={36} />} />
                <LicensaDashCards title="Atenção Requerida" value="8" color="orange" icon={<TriangleAlert color="orange" width={52} height={36} />} />
                <LicensaDashCards title="Condicionantes" value="24" color="purple" icon={<ListCheck color="purple" width={52} height={36} />} />
            </div>

            <CadastrarLicensa />
        </div>
    )
}