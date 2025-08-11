import MultiSelect from "../ui/multiselect";

const programasOptions = [
    { label: "Programa de Qualidade da Água Superficial", value: "qag" },
    { label: "Programa de Qualidade de Sedimentos", value: "qsd" }
]

export function ConfigLicensa() {
    return (
        <div>
            <form>
                <div className="p-5 bg-gray-50 rounded-md border-l-4 border-blue-600 space-y-5 flex flex-col ">
                    <div className="flex flex-col max-w-sm">
                        <label className="text-md font-semibold mb-3" htmlFor="number">Número</label>
                        <input className="border-2 p-2 bg-white rounded-sm w-full" name="number" />
                    </div>
                    <div className="flex flex-col max-w-sm">
                        <label className="text-md font-semibold mb-3" htmlFor="organ">Orgão</label>
                        <input className="border-2 p-2 bg-white rounded-sm w-full" name="organ" />
                    </div>
                    <div className="flex flex-col max-w-sm">
                        <label className="text-md font-semibold mb-3" htmlFor="emission_date">Emissão</label>
                        <input className="border-2 p-2 bg-white rounded-sm w-full" type="date" name="emission_date" />
                    </div>
                    <div className="flex flex-col max-w-sm">
                        <label className="text-md font-semibold mb-3" htmlFor="due_date">Validade</label>
                        <input className="border-2 p-2 bg-white rounded-sm w-full" type="date" name="due_date" />
                    </div>
                    <div className="flex flex-col max-w-sm">
                        <label className="text-md font-semibold mb-3" htmlFor="programs">Programas Necessários para a Licensa</label>
                        <MultiSelect options={programasOptions} value={[]} onChange={function (selected: string[]): void {
                            throw new Error("Function not implemented.");
                        }} />
                    </div>
                    <button className="bg-blue-600 rounded-md w-[5rem] mt-4 text-white hover:bg-blue-700">
                        Salvar
                    </button>
                </div>

            </form>

        </div>
    )
}