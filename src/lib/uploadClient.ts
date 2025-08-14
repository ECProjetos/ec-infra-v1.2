// lib/uploadClient.ts

import { createClient } from "@/utils/supabase/client";


const supabase = createClient()
// remove acentos (com fallback), caracteres fora de [A-Za-z0-9._-], espaços repetidos, etc.
function stripDiacritics(s: string) {
    try {
        return s.normalize("NFD").replace(/\p{Diacritic}/gu, "");
    } catch {
        // fallback para ambientes sem unicode property escapes
        return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
}

function sanitizeBaseName(raw: string, max = 80) {
    const extMatch = raw.match(/\.[^./\\]+$/);
    const ext = extMatch ? extMatch[0].toLowerCase() : "";
    const baseRaw = ext ? raw.slice(0, -ext.length) : raw;

    const base = stripDiacritics(baseRaw)
        .replace(/\s+/g, " ")            // colapsa espaços
        .trim()
        .replace(/[^A-Za-z0-9._-]+/g, "-") // somente ASCII seguro
        .replace(/-+/g, "-")               // colapsa hífens
        .replace(/^[-.]+|[-.]+$/g, "");    // remove pontas problemáticas

    const safe = (base || "file").slice(0, max);
    return `${safe}${ext || ""}`;
}

// sanitiza cada segmento do folder (ex.: "laudos/<userId>")
function sanitizeSegment(seg: string) {
    return stripDiacritics(seg)
        .replace(/\s+/g, "-")
        .replace(/[^A-Za-z0-9._-]+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^[-.]+|[-.]+$/g, "") || "x";
}

function joinPath(folder: string, fileName: string) {
    const parts = folder.split("/").filter(Boolean).map(sanitizeSegment);
    return [...parts, fileName].join("/");
}

export async function uploadFilesClient(
    files: FileList | null,
    folder: string, // ex.: "laudos/<userId>"
    bucket = "qualidade-agua-superficial"
): Promise<string[]> {
    if (!files || files.length === 0) return [];

    const urls: string[] = [];
    for (const file of Array.from(files)) {
        const safeName = sanitizeBaseName(file.name);
        const unique = `${Date.now()}_${Math.random().toString(36).slice(2, 12)}`;
        const key = joinPath(folder, `${unique}_${safeName}`).replace(/\/{2,}/g, "/");

        // opcional para depuração:
        // console.log("Uploading to key:", key);

        const { error } = await supabase.storage.from(bucket).upload(key, file, {
            upsert: false,
            cacheControl: "3600",
            contentType: file.type || "application/octet-stream",
        });
        if (error) throw error;

        const { data } = supabase.storage.from(bucket).getPublicUrl(key);
        urls.push(data.publicUrl);
    }
    return urls;
}
