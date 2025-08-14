import Papa from "papaparse";

function normalizeHeader(s: string) {
    return s
        .normalize("NFD").replace(/\p{Diacritic}/gu, "")
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase();
}

function normalizeValue(v: unknown): string {
    if (v == null) return "";
    const s = String(v).trim();
    if (!s) return "";
    const n = Number(s.replace(",", "."));
    return Number.isFinite(n) ? String(n) : s;
}

type Row = Record<string, string>;

type HeaderCheck = {
    ok: boolean;
    missing: string[];
    extra: string[];
    outOfOrder: boolean;
};

function checkHeaders(gotRaw: string[], expectedRaw: string[]): HeaderCheck {
    const got = gotRaw.map(normalizeHeader);
    const expected = expectedRaw.map(normalizeHeader);

    const missing = expected.filter((e) => !got.includes(e));
    const extra = got.filter((g) => !expected.includes(g));

    let outOfOrder = false;
    if (!missing.length && !extra.length) {
        outOfOrder = got.some((g, i) => g !== expected[i]);
    }

    return { ok: !missing.length && !extra.length && !outOfOrder, missing, extra, outOfOrder };
}

export type ParseCSVOptions = {
    expectedColumns: string[];
    label?: string;
    allowDifferentOrder?: boolean;
};

export function parseCSVGeneric(
    file: File,
    { expectedColumns, label = "CSV", allowDifferentOrder = false }: ParseCSVOptions,
    onSuccess: (rows: Row[]) => void,
    onError: (msg: string) => void
) {
    Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        worker: true,       // ✅ mantém worker
        encoding: "utf-8",
        // ❌ REMOVIDO: transformHeader (quebra com worker)
        complete: (results) => {
            // Fazemos o trim dos headers aqui
            const raw = results.meta.fields || [];
            const gotHeaders = raw.map((h) => (h ?? "").toString().trim());

            const hdrCheck = checkHeaders(gotHeaders, expectedColumns);
            if (!hdrCheck.ok && !(hdrCheck.outOfOrder && allowDifferentOrder)) {
                const exp = expectedColumns.join(" | ");
                const got = gotHeaders.join(" | ");
                const parts = [
                    `Arquivo de ${label} com cabeçalhos inválidos.`,
                    hdrCheck.missing.length ? `Faltando: ${hdrCheck.missing.join(", ")}` : "",
                    hdrCheck.extra.length ? `Extras: ${hdrCheck.extra.join(", ")}` : "",
                    hdrCheck.outOfOrder && !allowDifferentOrder ? "Ordem incorreta." : "",
                    `Esperado:\n${exp}\nRecebido:\n${got}`,
                ].filter(Boolean);
                onError(parts.join("\n"));
                return;
            }

            const rows: Row[] = (results.data as Record<string, unknown>[]).map((r) => {
                const obj: Row = {};
                Object.entries(r).forEach(([k, v]) => {
                    obj[k] = normalizeValue(v);
                });
                return obj;
            });

            onSuccess(rows);
        },
        error: (err) => onError(`Erro ao ler CSV: ${err.message}`),
    });
}
