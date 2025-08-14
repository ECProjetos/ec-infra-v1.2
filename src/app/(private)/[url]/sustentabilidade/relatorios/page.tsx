export default function RelatorioPage() {
    return (
        <div className="px-15 py-10">
            <div>
                <h1 className="font-semibold text-2xl">Geração de Relatórios</h1>
                <p className="text-gray-500">Configuração e geração automática de relatórios</p>
            </div>
            <div className="flex gap-5 mt-7">
                <div className="w-1/2 shadow-md rounded-md p-5 h-[50vh] space-y-2 flex flex-col justify-between">
                    <h1 className="font-semibold text-xl">Configurar Relatório</h1>
                    <div className="flex flex-col">
                        <label className="font-semibold">Tipo de relatório</label>
                        <select className="p-2 bg-white border-1 rounded-md mt-2">
                            <option>Selecione o tipo do Relatório</option>
                        </select>
                    </div>
                    <div>
                        <label className="font-semibold mt-2">Período</label>
                        <div className="flex flex-row max-w-full gap-3">

                            <input type="date" className="bg-white border-1 p-2 rounded-md mt-2 w-1/2" />
                            <input type="date" className="bg-white border-1 p-2 rounded-md mt-2 w-1/2" />
                        </div>
                    </div>
                    <div className="mt-3 flex flex-col">
                        <label className="font-semibold">Frequência</label>
                        <select className="mt-2 p-2 border-1 rounded-md">
                            <option>Selecione a frequencia</option>
                            <option>Mensal</option>
                            <option>Trimestral</option>
                            <option>Semestral</option>
                            <option>Anual</option>
                        </select>
                    </div>

                </div>

                <div className="w-1/2 shadow-md rounded-md">
                    opa
                </div>
            </div>
        </div>
    )
}