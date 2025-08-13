import { CadastrarLicensa } from "@/components/licensas/licensaForm";

export default function LicensaPage() {
    return (
        <div className="px-15 py-10 space-y-5">
            <div>
                <h1 className="font-semibold text-2xl">Gestão de Licenças Ambientais</h1>
                <p className="text-gray-500 muted">Gestão completa e acompanhamento de conformidade</p>
            </div>

            <CadastrarLicensa />
        </div>
    )
}