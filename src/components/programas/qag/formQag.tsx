"use client";

import { GetLabs } from "@/app/actions/laboratorios/getLabs";
import { GetLabResponsable } from "@/app/actions/laboratorios/getResponsables";
import { LaboratorioType, ResponsablesType } from "@/app/types/laboratorios/labs";
import { useAtivoStore } from "@/stores/useAtivoStore";
import { useEffect, useMemo, useState } from "react";
import { useUserStore } from "@/stores/userStore";

// >>> imports do parser
import {
    expectedColumnsQAG,
    QAGResultadosRow,
} from "@/lib/readCsv"; // ajuste o caminho para onde você salvou o arquivo com os parsers

import { parseCSVGeneric } from '@/lib/handleCsv'

export function FormQag() {
    const [laboratorios, setLabs] = useState<LaboratorioType[]>([]);
    const [responsables, setLabResponsables] = useState<ResponsablesType[]>([]);
    const [selectedLabId, setSelectedLabId] = useState<string>("");

    const ativo = useAtivoStore().ativo;
    const user = useUserStore().user;
    const ativoId = ativo?.id ?? "";
    const userId = user?.id ?? "";

    const selectedLab = useMemo(
        () => laboratorios.find((lab) => lab.id === selectedLabId),
        [laboratorios, selectedLabId]
    );

    const endereco = useMemo(
        () =>
            JSON.stringify({
                logradouro: selectedLab?.public_place,
                numero: selectedLab?.number,
                cidade: selectedLab?.city,
                estado: selectedLab?.uf,
                cep: selectedLab?.zip_code,
            }),
        [selectedLab]
    );

    // >>> estado do CSV de Resultados
    const [resultadoFileName, setResultadoFileName] = useState<string>("");
    const [resultadoRows, setResultadoRows] = useState<QAGResultadosRow[] | null>(null);
    const [resultadoError, setResultadoError] = useState<string | null>(null);

    useEffect(() => {
        if (!ativoId) return;
        (async () => {
            const labsResponse = await GetLabs({ asset_id: ativoId });
            setLabs(labsResponse.error ? [] : labsResponse.data);
        })();
    }, [ativoId]);

    useEffect(() => {
        if (!selectedLabId) {
            setLabResponsables([]);
            return;
        }
        (async () => {
            const resp = await GetLabResponsable({ lab_id: selectedLabId });
            setLabResponsables(resp.error ? [] : resp.data);
        })();
    }, [selectedLabId]);

    // >>> handler do CSV

    function handleResultadosChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        setResultadoRows(null);
        setResultadoError(null);
        setResultadoFileName(file ? file.name : "");

        if (!file) return;

        // ✅ usa o parser genérico com as colunas do QAG
        parseCSVGeneric(
            file,
            { expectedColumns: expectedColumnsQAG, label: "QAG", allowDifferentOrder: false },
            (rows) => {
                // rows é Record<string,string>[], compatível com QAGResultadosRow[]
                setResultadoRows(rows as QAGResultadosRow[]);
                setResultadoError(null);
            },
            (err) => {
                setResultadoRows(null);
                setResultadoError(err);
            }
        );
    }

    return (
        <div className="mt-5 space-y-4">
            <form>
                <input type="hidden" name="user_id" value={userId} />
                <input type="hidden" name="ativo_id" value={ativoId} />

                {/* hidden com dados do lab */}
                <input type="hidden" value={selectedLab?.name ?? ""} name="nome_laboratorio" />
                <input type="hidden" value={selectedLab?.legal_name ?? ""} name="razao_social_laboratorio" />
                <input type="hidden" value={selectedLab?.cnpj ?? ""} name="cnpj_laboratorio" />
                <input type="hidden" value={endereco} name="endereco_laboratorio" />
                <input type="hidden" value={selectedLab?.email ?? ""} name="email" />
                <input type="hidden" value={selectedLab?.contact ?? ""} name="contato" />

                {/* >>> hidden com o JSON das linhas parseadas (para o server) */}
                <input
                    type="hidden"
                    name="resultados_json"
                    value={resultadoRows ? JSON.stringify(resultadoRows) : ""}
                />

                <h1 className="font-bold text-md bg-gray-50 border-l-4 border-blue-600 rounded-md p-3 shadow-md text-center">
                    Tipo do Programa: Qualidade Superficial da Água
                </h1>

                <div className="bg-gray-50 border-l-4 border-blue-600 rounded-md p-3 shadow-md mt-3">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-6 md:px-20">
                        <div className="flex flex-col">
                            <label className="font-semibold">Campanha de Coleta</label>
                            <input
                                className="bg-white p-2 mt-2 w-full rounded border-b border-blue-600"
                                type="date"
                                name="campanha_de_coleta"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="font-semibold">Periodicidade da Análise</label>
                            <div className="mt-2 space-x-3 bg-white border-b border-blue-600 rounded-md flex">
                                {["mensal", "trimestral", "semestral", "anual"].map((p) => (
                                    <label key={p} className="mr-3">
                                        <input className="mx-2" type="radio" name="periodicidade_da_analise" value={p} />
                                        {p[0].toUpperCase() + p.slice(1)}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label className="font-semibold text-center md:text-left">Laboratório</label>
                            <select
                                className="mt-2 bg-white p-2 border-b border-blue-600 rounded-md"
                                value={selectedLabId}
                                onChange={(e) => setSelectedLabId(e.target.value)}
                            >
                                <option value="">Selecione o Laboratório</option>
                                {laboratorios?.map((lab) => (
                                    <option key={lab.id ?? lab.name} value={lab.id ?? ""}>
                                        {lab.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label className="font-semibold text-center md:text-left">Responsável Técnico</label>
                            <select className="mt-2 bg-white p-2 border-b border-blue-600 rounded-md" name="responsavel_tecnico">
                                <option value="">Selecione o Responsável Técnico</option>
                                {responsables?.map((resp) => (
                                    <option key={resp.id ?? resp.name} value={resp.id ?? ""}>
                                        {resp.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 border-l-4 border-blue-600 p-3 shadow-md rounded-md mt-3 flex flex-col space-y-3">
                    <label className="font-semibold">Resultados</label>

                    {/* >>> AQUI APLICADO */}
                    <input
                        className="bg-white border-b border-blue-600 rounded-md p-2"
                        type="file"
                        accept=".csv"
                        name="resultados"
                        onChange={handleResultadosChange}
                    />

                    {/* feedback do arquivo */}
                    {resultadoFileName && !resultadoError && resultadoRows && (
                        <p className="text-sm text-green-700">
                            Arquivo <strong>{resultadoFileName}</strong> válido — {resultadoRows.length} linha(s) lida(s).
                        </p>
                    )}
                    {resultadoError && (
                        <p className="text-sm text-red-600 whitespace-pre-wrap">
                            {resultadoError}
                        </p>
                    )}

                    <label className="font-semibold">Registros Fotográficos Sondas</label>
                    <input className="bg-white border-b border-blue-600 rounded-md p-2" type="file" accept=".png" name="registros_fotograficos_sondas" />

                    <label className="font-semibold">Registros Fotográficos Amostradores</label>
                    <input className="bg-white border-b border-blue-600 rounded-md p-2" type="file" accept=".png" name="registros_fotograficos_amostradores" />

                    <label className="font-semibold">Registros Fotográficos Caixas Térmicas</label>
                    <input className="bg-white border-b border-blue-600 rounded-md p-2" type="file" accept=".png" name="registros_fotograficos_caixas_termicas" />

                    <label className="font-semibold">Registros Fotográficos Outros</label>
                    <input className="bg-white border-b border-blue-600 rounded-md p-2" type="file" accept=".png" name="registros_fotograficos_caixas_outros" />

                    <label className="font-semibold">Laudos</label>
                    <input className="bg-white border-b border-blue-600 rounded-md p-2" type="file" accept=".pdf" name="laudos" />
                </div>
            </form>
        </div>
    );
}
