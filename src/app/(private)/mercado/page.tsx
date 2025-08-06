/* eslint-disable @typescript-eslint/no-explicit-any */
import { GroupedBarChart } from "@/components/mercado/barChart";
import { FaturamentoChart } from "@/components/mercado/earning";
import { FatoresCompetitivosCard } from "@/components/mercado/factors";
import { LineChartPlot } from "@/components/mercado/lineChart";
import { CargaMovimentacaoChart } from "@/components/mercado/movChart";
import { PosicionamentoCompetitivoTable } from "@/components/mercado/positionTable";
import { ProdutoResumoCard } from "@/components/mercado/productSummary";
import { CenarioResumoCard } from "@/components/mercado/scenary";
import { Leaf, Warehouse, Package } from "lucide-react";

const cargasData = [
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

const faturamentoMock = [
    { month: "Jan", value: 34 },
    { month: "Fev", value: 38 },
    { month: "Mar", value: 44 },
    { month: "Abr", value: 51 },
    { month: "Mai", value: 56 },
    { month: "Jun", value: 53 },
    { month: "Jul", value: 41 },
    { month: "Ago", value: 46 },
    { month: "Set", value: 50 },
    { month: "Out", value: 48 },
    { month: "Nov", value: 42 },
    { month: "Dez", value: 38 },
];

const produtosCargas = [
    { key: "soja", label: "Soja", color: "#facc15" },
    { key: "milho", label: "Milho", color: "#fb923c" },
    { key: "acucar", label: "Açúcar", color: "#3b82f6" },
    { key: "trigo", label: "Trigo", color: "#6366f1" },
];

const cardsData = [
    {
        title: "Soja - 2024",
        icon: <Leaf className="w-5 h-5 text-yellow-600" />,
        info: [
            { label: "Volume Previsto", value: "742k ton", color: "" },
            { label: "Crescimento", value: "+12.5%", color: "text-green-600" },
            { label: "Receita Estimada", value: "R$ 28.2M", color: "" },
        ],
        observacao: "Safra favorável + demanda chinesa forte",
        observacaoColor: "green" as any,
    },
    {
        title: "Milho - 2024",
        icon: <Warehouse className="w-5 h-5 text-yellow-500" />,
        info: [
            { label: "Volume Previsto", value: "356k ton", color: "" },
            { label: "Crescimento", value: "+8.3%", color: "text-green-600" },
            { label: "Receita Estimada", value: "R$ 15.8M", color: "" },
        ],
        observacao: "Segunda safra promissora + exportações",
        observacaoColor: "blue" as any,
    },
    {
        title: "Açúcar - 2024",
        icon: <Package className="w-5 h-5 text-blue-600" />,
        info: [
            { label: "Volume Previsto", value: "98k ton", color: "" },
            { label: "Crescimento", value: "-5.2%", color: "text-red-600" },
            { label: "Receita Estimada", value: "R$ 4.2M", color: "" },
        ],
        observacao: "Migração para etanol afeta volume",
        observacaoColor: "yellow" as any,
    },
];

const crescimentoData = [
    { year: 2024, ecinfra: 1200, paranagua: 1050, itajai: 890 },
    { year: 2025, ecinfra: 1300, paranagua: 1110, itajai: 960 },
    { year: 2026, ecinfra: 1450, paranagua: 1200, itajai: 1050 },
    { year: 2027, ecinfra: 1580, paranagua: 1280, itajai: 1120 },
    { year: 2028, ecinfra: 1650, paranagua: 1340, itajai: 1200 },
    { year: 2029, ecinfra: 1700, paranagua: 1400, itajai: 1300 },
];

const crescimentoSeries = [
    { key: "ecinfra", label: "EC Infra", color: "#3b82f6", strokeDasharray: "0" },
    { key: "paranagua", label: "Terminal Paranaguá", color: "#ef4444", strokeDasharray: "6 3" },
    { key: "itajai", label: "Porto de Itajaí", color: "#22c55e", strokeDasharray: "4 4" },
];

const concorrentesData = [
    { name: "EC Infra", "2024": 1200, "2029": 1700 },
    { name: "Terminal Paranaguá", "2024": 1050, "2029": 1400 },
    { name: "Porto de Itajaí", "2024": 890, "2029": 1300 },
    { name: "Terminal Rio Grande", "2024": 760, "2029": 1100 },
];

const cenariosData = [
    {
        title: "Cenário Otimista (2029)",
        info: [
            { label: "Movimentação Total", value: "2.1M ton", color: "text-green-600" },
            { label: "CAGR", value: "12.1%", color: "text-green-600" },
            { label: "Receita Anual", value: "R$ 89M", color: "text-green-600" },
            { label: "Market Share", value: "28%", color: "text-green-600" },
        ],
        observacao: "Expansão de capacidade + novos mercados + automação completa",
        observacaoColor: "green",
    },
    {
        title: "Cenário Base (2029)",
        info: [
            { label: "Movimentação Total", value: "1.7M ton", color: "text-blue-600" },
            { label: "CAGR", value: "7.3%", color: "text-blue-600" },
            { label: "Receita Anual", value: "R$ 68M", color: "text-blue-600" },
            { label: "Market Share", value: "22%", color: "text-blue-600" },
        ],
        observacao: "Crescimento moderado seguindo tendências do setor",
        observacaoColor: "blue",
    },
    {
        title: "Cenário Conservador (2029)",
        info: [
            { label: "Movimentação Total", value: "1.4M ton", color: "text-red-600" },
            { label: "CAGR", value: "3.1%", color: "text-red-600" },
            { label: "Receita Anual", value: "R$ 52M", color: "text-red-600" },
            { label: "Market Share", value: "18%", color: "text-red-600" },
        ],
        observacao: "Concorrência acirrada + restrições ambientais",
        observacaoColor: "red" as any,
    },
];

const posicionamentoData = [
    {
        terminal: "EC Infra",
        volumeAtual: "1.2M ton",
        volumeProjetado: "1.7M ton",
        cagr: "7.3%",
        cagrColor: "text-green-600",
        marketShare: "22%",
        marketShareColor: "text-blue-600",
        posicao: 1,
        destaque: true,
    },
    {
        terminal: "Terminal Paranaguá",
        volumeAtual: "1.05M ton",
        volumeProjetado: "1.4M ton",
        cagr: "5.9%",
        cagrColor: "text-yellow-600",
        marketShare: "18%",
        posicao: 2,
    },
    {
        terminal: "Porto de Itajaí",
        volumeAtual: "890k ton",
        volumeProjetado: "1.3M ton",
        cagr: "7.9%",
        cagrColor: "text-green-600",
        marketShare: "17%",
        posicao: 3,
    },
    {
        terminal: "Terminal Rio Grande",
        volumeAtual: "756k ton",
        volumeProjetado: "1.1M ton",
        cagr: "7.8%",
        cagrColor: "text-green-600",
        marketShare: "14%",
        posicao: 4,
    },
];

const vantagensCompetitivas = [
    {
        titulo: "Localização Estratégica",
        descricao: "Proximidade com principais regiões produtoras",
        cor: "bg-green-500",
    },
    {
        titulo: "Eficiência Operacional",
        descricao: "Taxa de carregamento 14% acima da média",
        cor: "bg-blue-500",
    },
    {
        titulo: "Investimentos em Tecnologia",
        descricao: "Automação planejada para 2025–2026",
        cor: "bg-purple-500",
    },
    {
        titulo: "Relacionamento com Clientes",
        descricao: "Contratos de longo prazo estabelecidos",
        cor: "bg-yellow-500",
    },
];

const desafiosERiscos = [
    {
        titulo: "Novos Concorrentes",
        descricao: "3 novos terminais previstos até 2027",
        cor: "bg-red-500",
    },
    {
        titulo: "Regulamentações Ambientais",
        descricao: "Novas exigências podem aumentar custos",
        cor: "bg-orange-500",
    },
    {
        titulo: "Volatilidade de Commodities",
        descricao: "Preços podem afetar volumes",
        cor: "bg-yellow-500",
    },
    {
        titulo: "Necessidade de Investimentos",
        descricao: "R$ 45M em capex nos próximos 3 anos",
        cor: "bg-gray-600",
    },
];


export default function MercadoPage() {
    return (
        <div className="px-15 py-10">
            <h1 className="font-bold text-2xl">Gestão Estratégica</h1>
            <h2 className="font-semibold text-2xl mt-8">Objetivos Estratégicos 2024</h2>

            <div className="flex mt-8 gap-10">
                <div className="w-1/2">
                    <CargaMovimentacaoChart data={cargasData} produtos={produtosCargas} />
                </div>
                <div className="w-1/2">
                    <FaturamentoChart
                        data={faturamentoMock}
                        barColor="#10b981"
                        yAxisLabel="R$ mil"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                {cardsData.map((card, idx) => (
                    <ProdutoResumoCard key={idx} {...card} />
                ))}
            </div>

            <h2 className="font-semibold text-2xl mt-12">Projeções de Médio Prazo (2024-2029)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <LineChartPlot
                    data={crescimentoData}
                    series={crescimentoSeries}
                    key="year"
                    title="Projeção de Crescimento - 5 Anos"
                />
                <GroupedBarChart
                    data={concorrentesData}
                    xAxisKey="name"
                    title="Comparativo com Concorrentes - Projeção"
                    series={[
                        { key: "2024", label: "2024", color: "#3b82f6" },
                        { key: "2029", label: "2029 (Projeção)", color: "#10b981" },
                    ]}
                />
            </div>
            <h2 className="font-semibold text-2xl mt-12">Projeções de Médio Prazo (2024-2029)</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {cenariosData.map((cenario, idx) => (
                    <CenarioResumoCard key={idx} {...cenario} />
                ))}
            </div>
            <h2 className="font-semibold text-2xl mt-12">Análise Competitiva - Projeções</h2>
            <div className="mt-6">
                <PosicionamentoCompetitivoTable data={posicionamentoData} />
            </div>
            <h2 className="font-semibold text-2xl mt-12">Fatores Estratégicos</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <FatoresCompetitivosCard titulo="Vantagens Competitivas" fatores={vantagensCompetitivas} />
                <FatoresCompetitivosCard titulo="Desafios e Riscos" fatores={desafiosERiscos} />
            </div>

        </div>
    );
}