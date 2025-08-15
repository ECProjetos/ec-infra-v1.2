/* eslint-disable @typescript-eslint/no-explicit-any */
// app/programas/qag/FormQag.tsx
"use client";

import { GetLabs } from "@/app/actions/laboratorios/getLabs";
import { GetLabResponsable } from "@/app/actions/laboratorios/getResponsables";
import { LaboratorioType, ResponsablesType } from "@/app/types/laboratorios/labs";
import { useAtivoStore } from "@/stores/useAtivoStore";
import { useActionState, useEffect, useMemo, useState } from "react";
import { useUserStore } from "@/stores/userStore";
import { uploadFilesClient } from "@/lib/uploadClient";
import { parseCSVGeneric } from "@/lib/handleCsv";
import { expectedColumnsQAG, QAGResultadosRow } from "@/lib/readCsv";
import { createQualidadeAguaSuperficial } from "@/app/actions/programas/qag/sendQagForm";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const initialState = { success: false, error: null as string | null };

export function FormQag() {
    const [state, formAction] = useActionState(
        async (_prev: any, formData: FormData) => await createQualidadeAguaSuperficial(formData),
        initialState
    );

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

    useEffect(() => {
        if (state.success) toast.success("Formulário enviado com sucesso!");
        setResultadoFileName("");
        setResultadoRows(null);
        setResultadoError(null);
        setSondasUrls([]);
        setAmostradoresUrls([]);
        setCaixasUrls([]);
        setOutrosUrls([]);
        setLaudosUrls([]);
        if (state.error) toast.error(`Erro ao enviar: ${state.error}`);
    }, [state]);

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

    // CSV (Resultados)
    const [resultadoFileName, setResultadoFileName] = useState<string>("");
    const [resultadoRows, setResultadoRows] = useState<QAGResultadosRow[] | null>(null);
    const [resultadoError, setResultadoError] = useState<string | null>(null);

    // URLs dos uploads (cliente)
    const [sondasUrls, setSondasUrls] = useState<string[]>([]);
    const [amostradoresUrls, setAmostradoresUrls] = useState<string[]>([]);
    const [caixasUrls, setCaixasUrls] = useState<string[]>([]);
    const [outrosUrls, setOutrosUrls] = useState<string[]>([]);
    const [laudosUrls, setLaudosUrls] = useState<string[]>([]);

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

    // CSV handler (não envia o arquivo no body)
    function handleResultadosChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0] || null;
        setResultadoRows(null);
        setResultadoError(null);
        setResultadoFileName(file ? file.name : "");
        if (!file) return;

        parseCSVGeneric(
            file,
            { expectedColumns: expectedColumnsQAG, label: "QAG", allowDifferentOrder: false },
            (rows) => {
                setResultadoRows(rows as QAGResultadosRow[]);
                setResultadoError(null);
            },
            (err) => {
                setResultadoRows(null);
                setResultadoError(err);
            }
        );
    }

    // Uploads no cliente → salva URLs em estado
    async function handleUpload(
        e: React.ChangeEvent<HTMLInputElement>,
        folder: string,
        setter: (urls: string[]) => void
    ) {
        // capture o input e os arquivos AGORA, antes de await
        const inputEl = e.currentTarget;
        const files = inputEl.files;

        try {
            const urls = await uploadFilesClient(files, `${folder}/${userId}`);
            setter(urls);
            toast.success(`Upload concluído: ${urls.length} arquivo(s).`);
        } catch (err: any) {
            toast.error(err?.message || "Falha no upload");
        } finally {
            // limpe com segurança (só se ainda existir)
            if (inputEl) inputEl.value = "";
        }
    }
    return (
        <div className="mt-5 space-y-4">
            <form action={formAction}>
                <input type="hidden" name="user_id" value={userId} />
                <input type="hidden" name="ativo_id" value={ativoId} />

                {/* dados do lab */}
                <input type="hidden" value={selectedLab?.name ?? ""} name="nome_laboratorio" />
                <input type="hidden" value={selectedLab?.legal_name ?? ""} name="razao_social_laboratorio" />
                <input type="hidden" value={selectedLab?.cnpj ?? ""} name="cnpj_laboratorio" />
                <input type="hidden" value={endereco} name="endereco_laboratorio" />
                <input type="hidden" value={selectedLab?.email ?? ""} name="email" />
                <input type="hidden" value={selectedLab?.contact ?? ""} name="contato" />

                {/* JSON do CSV parseado */}
                <input
                    type="hidden"
                    name="resultados_json"
                    value={resultadoRows ? JSON.stringify(resultadoRows) : ""}
                />

                {/* URLs dos uploads (cliente) */}
                <input type="hidden" name="registros_fotograficos_sondas" value={JSON.stringify(sondasUrls)} />
                <input type="hidden" name="registros_fotograficos_amostradores" value={JSON.stringify(amostradoresUrls)} />
                <input type="hidden" name="registros_fotograficos_caixas_termicas" value={JSON.stringify(caixasUrls)} />
                <input type="hidden" name="registros_fotograficos_outros" value={JSON.stringify(outrosUrls)} />
                <input type="hidden" name="laudos" value={JSON.stringify(laudosUrls)} />
                <div className="bg-gray-50 border-l-4 border-blue-600 rounded-md p-3 shadow-md mt-3">
                    <h1 className="font-semibold text-xl text-center mb-5">Tipo do Programa: Qualidade Superficial da Água</h1>

                    <div className="grid grid-cols-1 md:grid-cols-4 py-3 gap-6 px-6 md:px-10">
                        <div className="flex flex-col">
                            <label className="font-semibold">Campanha de Coleta</label>
                            <input
                                className="bg-white p-2 mt-2 w-full rounded border-1"
                                type="date"
                                name="campanha_de_coleta"
                                required
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="font-semibold">Periodicidade da Análise</label>
                            <select
                                className="mt-2 bg-white p-2 border-1 rounded-md"
                                name="periodicidade_da_analise"
                                required
                            >
                                <option value="">Selecione a periodicidade</option>
                                {["mensal", "trimestral", "semestral", "anual"].map((p) => (
                                    <option key={p} value={p}>
                                        {p[0].toUpperCase() + p.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label className="font-semibold text-center md:text-left">Laboratório</label>
                            <select
                                className="mt-2 bg-white p-2 border-1 rounded-md"
                                value={selectedLabId}
                                onChange={(e) => setSelectedLabId(e.target.value)}
                                required
                            >
                                <option value="">Selecione o Laboratório</option>
                                {laboratorios.map((lab) => (
                                    <option key={lab.id ?? lab.name} value={lab.id ?? ""}>
                                        {lab.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label className="font-semibold text-center md:text-left">Responsável Técnico</label>
                            <select className="mt-2 bg-white p-2 border-1 rounded-md" name="responsavel_tecnico" required>
                                <option value="">Selecione o Responsável Técnico</option>
                                {responsables.map((resp) => (
                                    <option key={resp.id ?? resp.name} value={resp.id ?? ""}>
                                        {resp.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 border-l-4 border-blue-600 p-3 shadow-md rounded-md mt-3 flex flex-col space-y-3">
                    <label className="font-semibold">Resultados (CSV QAG)</label>
                    {/* sem name → não vai no body */}
                    <input
                        className="bg-white border-1 rounded-md p-2"
                        type="file"
                        accept=".csv"
                        onChange={handleResultadosChange}
                    />
                    {resultadoFileName && !resultadoError && resultadoRows && (
                        <p className="text-sm text-green-700">
                            Arquivo <strong>{resultadoFileName}</strong> válido — {resultadoRows.length} linha(s).
                        </p>
                    )}
                    {resultadoError && <p className="text-sm text-red-600 whitespace-pre-wrap">{resultadoError}</p>}

                    <label className="font-semibold">Registros Fotográficos Sondas (.png)</label>
                    <input
                        className="bg-white border-1 rounded-md p-2"
                        type="file"
                        accept=".png"
                        multiple
                        onChange={(e) => handleUpload(e, "sondas", setSondasUrls)}
                    />
                    {!!sondasUrls.length && <p className="text-xs text-gray-600">{sondasUrls.length} arquivo(s) enviado(s).</p>}

                    <label className="font-semibold">Registros Fotográficos Amostradores (.png)</label>
                    <input
                        className="bg-white border-1 rounded-md p-2"
                        type="file"
                        accept=".png"
                        multiple
                        onChange={(e) => handleUpload(e, "amostradores", setAmostradoresUrls)}
                    />
                    {!!amostradoresUrls.length && <p className="text-xs text-gray-600">{amostradoresUrls.length} arquivo(s) enviado(s).</p>}

                    <label className="font-semibold">Registros Fotográficos Caixas Térmicas (.png)</label>
                    <input
                        className="bg-white border-1 rounded-md p-2"
                        type="file"
                        accept=".png"
                        multiple
                        onChange={(e) => handleUpload(e, "caixas_termicas", setCaixasUrls)}
                    />
                    {!!caixasUrls.length && <p className="text-xs text-gray-600">{caixasUrls.length} arquivo(s) enviado(s).</p>}

                    <label className="font-semibold">Registros Fotográficos Outros (.png)</label>
                    <input
                        className="bg-white border-1 rounded-md p-2"
                        type="file"
                        accept=".png"
                        multiple
                        onChange={(e) => handleUpload(e, "outros", setOutrosUrls)}
                    />
                    {!!outrosUrls.length && <p className="text-xs text-gray-600">{outrosUrls.length} arquivo(s) enviado(s).</p>}

                    <label className="font-semibold">Laudos (.pdf)</label>
                    <input
                        className="bg-white border-1 rounded-md p-2"
                        type="file"
                        accept=".pdf"
                        multiple
                        onChange={(e) => handleUpload(e, "laudos", setLaudosUrls)}
                    />
                    {!!laudosUrls.length && <p className="text-xs text-gray-600">{laudosUrls.length} arquivo(s) enviado(s).</p>}

                </div>

                <div className="flex justify-end">
                    <Button className="bg-blue-600 mt-2 p-4" type="submit">Enviar</Button>
                </div>
            </form>
        </div>
    );
}
