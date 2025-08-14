import { GetLabs } from "@/app/actions/laboratorios/getLabs";
import { GetLabResponsable } from "@/app/actions/laboratorios/getResponsables";
import { LaboratorioType, ResponsablesType } from "@/app/types/laboratorios/labs"
import { useAtivoStore } from "@/stores/useAtivoStore";
import { useEffect, useState } from "react"
import { FileInputsQag } from "./fileInputs";

export function FormQag() {
    const [laboratorios, setLabs] = useState<LaboratorioType[]>();
    const ativo = useAtivoStore().ativo
    const ativoId = ativo?.id
    const [selectedLabId, setSelectedLabId] = useState('')
    const [responsables, setLabResponsables] = useState<ResponsablesType[]>();


    useEffect(() => {
        if (!ativoId) {
            console.log('sem ativo')
            return
        }
        (async () => {
            const labsResponse = await GetLabs({ asset_id: ativoId });
            if (labsResponse.error) {
                console.error(labsResponse.error);
                setLabs([]);
            } else {
                setLabs(labsResponse.data);
            }
        })();
    }, [ativoId]);

    useEffect(() => {
        if (!selectedLabId) {
            console.log('sem lab')
            return
        }
        (async () => {
            const labsResponse = await GetLabResponsable({ lab_id: selectedLabId });
            if (labsResponse.error) {
                console.error(labsResponse.error);
                setLabResponsables([]);
            } else {
                setLabResponsables(labsResponse.data);
            }
        })();
    }, [selectedLabId]);

    return (
        <div className="mt-5 space-y-4">
            <form>
                <h1 className="font-bold text-md bg-gray-50 border-l-4 border-blue-600 rounded-md p-3 shadow-md text-center"> Tipo do Programa: Qualidade Superficial da Água</h1>
                <div className="bg-gray-50 border-l-4 border-blue-600 rounded-md p-3 shadow-md mt-3">
                    <div className="flex flex-col-4 justify-between px-[5rem]">
                        <div className="flex flex-col">
                            <label className="font-semibold">Campanha de Coleta</label>
                            <input className="bg-white p-2 mt-2 w-full rounded md border-b-1 border-blue-600" type="date" name="collection_date" />
                        </div>
                        <div className="flex-flex-col text-center">
                            <label className="font-semibold ">Periodicidade da Análise</label>
                            <div className="mt-2 space-x-3 bg-white p-2 border-b-1 border-blue-600 rounded-md">
                                <label>
                                    <input className="mx-2" type="radio" name="periodicidade" value="mensal" />
                                    Mensal
                                </label>
                                <label>
                                    <input className="mx-2" type="radio" name="periodicidade" value="trimestral" />
                                    Trimestral
                                </label>
                                <label>
                                    <input className="mx-2" type="radio" name="periodicidade" value="semestral" />
                                    Semestral
                                </label>
                                <label>
                                    <input className="mx-2" type="radio" name="periodicidade" value="anual" />
                                    Anual
                                </label>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label className="font-semibold text-center">Laboratório</label>
                            <select
                                className="mt-2 space-x-3 bg-white p-2 border-b-1 border-blue-600 rounded-md"
                                value={selectedLabId}
                                onChange={e => setSelectedLabId(e.target.value)}
                            >
                                <option value="">Selecione o Laboratório</option>
                                {laboratorios?.map((lab, idx) => (
                                    <option key={lab.id ?? idx} value={lab.id ?? ''}>
                                        {lab.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label className="font-semibold text-center">Responsável Técnico</label>
                            <select className="mt-2 space-x-3 bg-white p-2 border-b-1 border-blue-600 rounded-md">
                                <option value="">Selecione o Responsável Técnico</option>
                                {responsables?.map((resp, idx) => (
                                    <option key={resp.id ?? idx} value={resp.id ?? ''}>
                                        {resp.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <FileInputsQag />
            </form >
        </div >

    )
}