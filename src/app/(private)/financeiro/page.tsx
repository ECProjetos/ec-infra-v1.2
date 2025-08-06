import FinancialCard from "@/components/financeiro/topCards"
import { DollarSign, LineChart, Percent, Coins } from "lucide-react"
import { DonutChart } from "@/components/charts/donutChart"
import { TimeSeriesComparisonChart } from "@/components/financeiro/incomeChart"
import { ReceitaPorTabela } from "@/components/financeiro/incomeTable"
import { IndicadoresChave } from "@/components/financeiro/keyIndicators"
const financialData = [
    {
        label: "Receita Mensal",
        date: "Janeiro 2024",
        value: "R$ 45.2M",
        variation: "+12.3% vs mês anterior",
        variationPositive: true,
        icon: <DollarSign className="w-5 h-5" />,
        iconColor: "text-green-600",
    },
    {
        label: "EBITDA",
        date: "Janeiro 2024",
        value: "R$ 18.7M",
        variation: "+8.9% vs mês anterior",
        variationPositive: true,
        icon: <LineChart className="w-5 h-5" />,
        iconColor: "text-blue-600",
    },
    {
        label: "Margem EBITDA",
        date: "Janeiro 2024",
        value: "41.4%",
        variation: "-1.2% vs mês anterior",
        variationPositive: false,
        icon: <Percent className="w-5 h-5" />,
        iconColor: "text-purple-600",
    },
    {
        label: "Custos Operacionais",
        date: "Janeiro 2024",
        value: "R$ 26.5M",
        variation: "+15.2% vs mês anterior",
        variationPositive: false,
        icon: <Coins className="w-5 h-5" />,
        iconColor: "text-orange-600",
    },
]

const custoData = [
    { name: "Pessoal", value: 9.3 },
    { name: "Manutenção", value: 6.6 },
    { name: "Energia", value: 4.0 },
    { name: "Combustível", value: 3.2 },
    { name: "Outros", value: 3.4 },
]


const receitaData = [
    { mes: "Jan", valor1: 32, valor2: 45 },
    { mes: "Feb", valor1: 36, valor2: 48 },
    { mes: "Mar", valor1: 42, valor2: 52 },
    { mes: "Apr", valor1: 48, valor2: 50 },
    { mes: "May", valor1: 53, valor2: 54 },
    { mes: "Jun", valor1: 51, valor2: 52 },
    { mes: "Jul", valor1: 38, valor2: null },
    { mes: "Aug", valor1: 41, valor2: null },
    { mes: "Sep", valor1: 46, valor2: null },
    { mes: "Oct", valor1: 44, valor2: null },
    { mes: "Nov", valor1: 40, valor2: null },
    { mes: "Dec", valor1: 36, valor2: null },
]

const tableReceitaData = [
    { nome: "Tabela I", receita: "R$ 18.2M", percentual: "40.3%", variacao: "+8.5%", variacaoPositiva: true },
    { nome: "Tabela II", receita: "R$ 12.8M", percentual: "28.3%", variacao: "+15.2%", variacaoPositiva: true },
    { nome: "Tabela III", receita: "R$ 8.4M", percentual: "18.6%", variacao: "+12.1%", variacaoPositiva: true },
    { nome: "Arrendamentos", receita: "R$ 3.9M", percentual: "8.6%", variacao: "-2.3%", variacaoPositiva: false },
    { nome: "Outros", receita: "R$ 1.9M", percentual: "4.2%", variacao: "+5.7%", variacaoPositiva: true },
]
export default function FinanceiroPage() {
    return (
        <div className="px-15 py-10 space-y-10">
            <h1 className="text-2xl">
                Gestão Financeira
            </h1>
            <div className="font-bold">
                <FinancialCard data={financialData} />
            </div>
            <div className="font-bold flex ga">
                <div className="w-1/2">
                    <DonutChart
                        title="Composição de Custos"
                        data={custoData}
                        unit="R$"
                        showTotal={true}
                        colors={["#ef4444", "#f97316", "#fbbf24", "#10b981", "#8b5cf6"]}
                    />
                </div>
                <div className="w-1/2">
                    <TimeSeriesComparisonChart
                        data={receitaData}
                        unit="R$"
                        label1="Receita 2023"
                        label2="Receita 2024"
                        color1="#9CA3AF"
                        color2="#059669"
                    />
                </div>
            </div>

            {/* Cards alinhados e responsivos */}
            <div className="flex gap-10 items-stretch h-[360px]">
                <div className="w-1/2 flex flex-col h-full">
                    <ReceitaPorTabela data={tableReceitaData} tipo_tabela="Tabela" />
                </div>
                <div className="w-1/2 flex flex-col h-full">
                    <IndicadoresChave />
                </div>
            </div>
            <div className="flex gap-10 items-stretch h-[360px]">
                <div className="w-1/2 flex flex-col h-full">
                    <ReceitaPorTabela data={tableReceitaData} tipo_tabela="Cliente" />
                </div>
                <div className="w-1/2 flex flex-col h-full">
                    <ReceitaPorTabela data={tableReceitaData} tipo_tabela="Tabela" />
                </div>
            </div>
        </div>
    )
}