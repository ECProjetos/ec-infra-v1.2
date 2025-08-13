/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Papa from "papaparse";

// Adapte aos seus tipos reais, mas estes cobrem seu CSV atual:
export type PointsLocationRow = {
    ponto?: string | null;
    utm_e_m?: number | null;
    utm_n_m?: number | null;
    classe_uso_da_agua?: string | null;
};

export type PeriodicityRow = {
    grupo?: string | null;
    parametro?: string | null;
    periodicidade?: string | null;
    // o CSV pode ter colunas extras ("", _1, _2) que ignoraremos
};

interface ProgramaQagProps {
    onFormChange: (data: any) => void;
}

function normalizeHeader(h: string) {
    // normaliza cabeçalhos: tira acentos, minúsculas e troca espaço por _
    return h
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "_");
}

const toNum = (v: unknown) => {
    if (v === null || v === undefined || v === "") return null;
    const s = String(v).replace(",", ".").trim();
    const n = Number(s);
    return Number.isFinite(n) ? n : null;
};

const cleanStr = (v: unknown) =>
    v === null || v === undefined ? "" : String(v).trim();

export function ProgramaQag({ onFormChange }: ProgramaQagProps) {
    const [formData, setFormData] = useState({
        metodology: "",
        sample_type: "",
        sample_shower: "",
        container_type: "",
        container_moving: "",
        points_location: [] as PointsLocationRow[],
        periodicity_parameters: [] as PeriodicityRow[],
    });

    useEffect(() => {
        onFormChange(formData);
    }, [formData, onFormChange]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const parseCsv = <T,>(file: File): Promise<T[]> =>
        new Promise((resolve, reject) => {
            Papa.parse<T>(file, {
                header: true,
                skipEmptyLines: true,
                transformHeader: normalizeHeader,
                complete: (res: Papa.ParseResult<T>) => {
                    // limpeza: "" -> null
                    const rows = (res.data as any[]).map((r) => {
                        const cleaned: any = {};
                        Object.entries(r).forEach(([k, v]) => {
                            cleaned[k] = v === "" ? null : v;
                        });
                        return cleaned;
                    });
                    resolve(rows as T[]);
                },
                error: (err) => reject(err),
            });
        });

    const handlePointsCsv = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const rows = await parseCsv<PointsLocationRow>(file);

        // coerções de número + trim de string
        const coerced = rows
            .map((r) => ({
                ponto: cleanStr(r.ponto ?? ""),
                utm_e_m: toNum(r.utm_e_m ?? null),
                utm_n_m: toNum(r.utm_n_m ?? null),
                classe_uso_da_agua: cleanStr(r.classe_uso_da_agua ?? ""),
            }))
            // filtra linhas completamente vazias
            .filter(
                (r) =>
                    r.ponto ||
                    r.utm_e_m !== null ||
                    r.utm_n_m !== null
            );

        setFormData((prev) => ({ ...prev, points_location: coerced }));
    };

    const handlePeriodicityCsv = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const rows = await parseCsv<PeriodicityRow>(file);

        const coerced = rows
            .map((r) => ({
                grupo: cleanStr(r.grupo ?? ""),
                parametro: cleanStr(r.parametro ?? ""),
                periodicidade: cleanStr(r.periodicidade ?? ""),
            }))
            .filter((r) => r.grupo || r.parametro || r.periodicidade);

        setFormData((prev) => ({ ...prev, periodicity_parameters: coerced }));
    };

    return (
        <div>
            <div className="bg-gray-50 rounded-md border-l-4 border-blue-600 p-5 mt-5 shadow-md">
                <div>
                    <label className="font-semibold">Localização dos Pontos de monitoramento</label>
                    <input
                        type="file"
                        accept=".csv"
                        className="border border-dashed p-6 w-full bg-white mt-3 mb-3"
                        name="points_location_file"
                        onChange={handlePointsCsv}
                    />
                </div>
                <div>
                    <label className="font-semibold">Parâmetros e periodicidade</label>
                    <input
                        type="file"
                        accept=".csv"
                        className="border border-dashed p-6 w-full bg-white mt-3"
                        name="periodicity_parameters_file"
                        onChange={handlePeriodicityCsv}
                    />
                </div>
            </div>

            <div className="bg-gray-50 rounded-md border-l-4 border-blue-600 p-5 mt-5 shadow-md space-y-3">
                <h1 className="font-bold text-xl">Dados Laboratoriais</h1>

                <div>
                    <label className="font-semibold">Metodologia adotada</label>
                    <input
                        name="metodology"
                        className="border p-2 w-full bg-white mt-3"
                        value={formData.metodology}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="font-semibold">Tipo de amostragem</label>
                    <input
                        name="sample_type"
                        className="border p-2 w-full bg-white mt-3"
                        value={formData.sample_type}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="font-semibold">Amostrador de coleta</label>
                    <input
                        name="sample_shower"
                        className="border p-2 w-full bg-white mt-3"
                        value={formData.sample_shower}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="font-semibold">Tipo de frasco de armazenamento</label>
                    <input
                        name="container_type"
                        className="border p-2 w-full bg-white mt-3"
                        value={formData.container_type}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="font-semibold">Equipamento de Armazenamento para Transporte</label>
                    <input
                        name="container_moving"
                        className="border p-2 w-full bg-white mt-3"
                        value={formData.container_moving}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </div>
    );
}
