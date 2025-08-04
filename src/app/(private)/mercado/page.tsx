import { CargaMovimentacaoChart } from "@/components/mercado/movChart";

export const cargasData = [
    { month: "Jan", soja: 48, milho: 30, acucar: 12, trigo: 5 },
    { month: "Fev", soja: 55, milho: 33, acucar: 9, trigo: 7 },
    { month: "Mar", soja: 68, milho: 36, acucar: 7, trigo: 9 },
    { month: "Abr", soja: 75, milho: 39, acucar: 11, trigo: 12 },
    { month: "Mai", soja: 82, milho: 43, acucar: 18, trigo: 16 },
    { month: "Jun", soja: 81, milho: 45, acucar: 17, trigo: 15 },
    { month: "Jul", soja: 58, milho: 33, acucar: 10, trigo: 10 },
    { month: "Ago", soja: 66, milho: 39, acucar: 13, trigo: 12 },
    { month: "Set", soja: 70, milho: 42, acucar: 16, trigo: 13 },
    { month: "Out", soja: 67, milho: 41, acucar: 12, trigo: 11 },
    { month: "Nov", soja: 55, milho: 37, acucar: 8, trigo: 8 },
    { month: "Dez", soja: 43, milho: 30, acucar: 9, trigo: 7 },
];

export const produtosCargas = [
    { key: "soja", label: "Soja", color: "#facc15" },
    { key: "milho", label: "Milho", color: "#fb923c" },
    { key: "acucar", label: "Açúcar", color: "#3b82f6" },
    { key: "trigo", label: "Trigo", color: "#6366f1" },
];

export default function MercadoPage() {
    return (
        <div className="px-15 py-10 animate__animated animate__backInUp">
            <h1 className="font-bold text-2xl">Gestão Estratégica</h1>
            <h2 className="font-semibold text-2xl mt-8">Objetivos Estratégicos 2024</h2>
            <div className="flex mt-8 gap-10">
                <div className="w-1/2">
                    <CargaMovimentacaoChart data={cargasData} produtos={produtosCargas} />
                </div>
            </div>
        </div>
    );
}