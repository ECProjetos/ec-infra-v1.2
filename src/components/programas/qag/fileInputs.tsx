export function FileInputsQag() {
    return (
        <div className="bg-gray-50 border-l-4 border-blue-600 p-3 shadow-md rounded-md mt-3 flex flex-col space-y-3">
            <label className="font-semibold">Resultados</label>
            <input className="bg-white border-b-1 border-blue-600 rounded-md p-2" type="file" accept=".csv" />
            <label className="font-semibold">Registros Fotográficos</label>
            <input className="bg-white border-b-1 border-blue-600 rounded-md p-2" type="file" accept=".png" />
            <label className="font-semibold">Registros Fotográficos Amostradores</label>
            <input className="bg-white border-b-1 border-blue-600 rounded-md p-2" type="file" accept=".png" />
            <label className="font-semibold">Registros Fotográficos Caixas Térmicas</label>
            <input className="bg-white border-b-1 border-blue-600 rounded-md p-2" type="file" accept=".png" />
            <label className="font-semibold">Registros Fotográficos Outros</label>
            <input className="bg-white border-b-1 border-blue-600 rounded-md p-2" type="file" accept=".png" />
            <label className="font-semibold">Laudos</label>
            <input className="bg-white border-b-1 border-blue-600 rounded-md p-2" type="file" accept=".pdf" />
        </div>
    )
}