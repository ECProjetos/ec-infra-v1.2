
export function ProgramaQag(
) {
    return (
        <div>
            <div className="bg-gray-50 rounded-md border-l-4 border-blue-600 p-5 mt-5 shadow-md">
                <div>
                    <label className="font-semibold">Localização dos Pontos de monitoramento</label>
                    <input type="file" accept=".csv" className="border border-dashed p-6 w-full bg-white mt-3 mb-3" />
                </div>
                <div>
                    <label className="font-semibold">Parâmetros e periodicidade</label>
                    <input type="file" accept=".csv" className="border border-dashed p-6 w-full bg-white mt-3" />
                </div>
            </div>
            <div className="bg-gray-50 rounded-md border-l-4 border-blue-600 p-5 mt-5 shadow-md space-y-3">
                <h1 className="font-bold text-xl">Dados Laboritoriais</h1>
                <div>
                    <label className="font-semibold">Metodologia adotada</label>
                    <input name="metodology" className="border  p-2 w-full bg-white mt-3" />
                </div>
                <div>
                    <label className="font-semibold">Tipo de amostragem</label>
                    <input name="sample_type" className="border  p-2 w-full bg-white mt-3" />
                </div>
                <div>
                    <label className="font-semibold">Amostrador de coleta</label>
                    <input name="sample_shower" className="border  p-2 w-full bg-white mt-3" />
                </div>
                <div>
                    <label className="font-semibold">Tipo de frasco de armazenamento</label>
                    <input name="container_type" className="border p-2 w-full bg-white mt-3" />
                </div>
                <div>
                    <label className="font-semibold">Equipamento de Armazenamento para Transporte</label>
                    <input name="container_moving" className="border  p-2 w-full bg-white mt-3" />
                </div>
            </div>
        </div>

    )
}