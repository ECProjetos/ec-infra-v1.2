// ReceitaPorTabela.tsx
interface ReceitaTabela {
    nome: string
    receita: string
    percentual: string
    variacao: string
    variacaoPositiva: boolean
}

interface ReceitaTabelaProps {
    data: ReceitaTabela[]
    tipo_tabela: string
}



export function ReceitaPorTabela({ data, tipo_tabela }: ReceitaTabelaProps) {
    return (
        <div className="bg-white p-6 rounded-xl border shadow-sm h-full transition-transform duration-300 ease-out hover:-translate-y-2">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">{tipo_tabela}</h2>
            <table className="min-w-full text-left">
                <thead>
                    <tr className="text-gray-500 text-sm">
                        <th className="font-medium pb-2">{tipo_tabela}</th>
                        <th className="font-medium pb-2">Receita (R$)</th>
                        <th className="font-medium pb-2">% Total</th>
                        <th className="font-medium pb-2">Var. Mensal</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, idx) => (
                        <tr key={item.nome} className="border-t last:border-b text-base">
                            <td className={`py-2 font-medium ${idx === 0 ? "text-gray-900" : "text-gray-700"}`}>{item.nome}</td>
                            <td className="py-2">{item.receita}</td>
                            <td className="py-2">{item.percentual}</td>
                            <td className="py-2">
                                <span className={item.variacaoPositiva ? "text-green-600 font-medium" : "text-red-500 font-medium"}>
                                    {item.variacao}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
