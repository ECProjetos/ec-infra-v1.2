/* eslint-disable @typescript-eslint/no-explicit-any */
import { LicenseSchema } from "@/app/types/licensas/license";
import { createClient } from "@/utils/supabase/client";

export async function CreateLicense(formData: FormData): Promise<any> {
  // 1) pegue TUDO, exceto "programs"
  const entries = Array.from(formData.entries()).filter(([k]) => k !== "programs");
  const base = Object.fromEntries(entries);

  // 2) obtenha "programs" como ARRAY
  const programs = formData.getAll("programs").map(String);

  // 3) componha o payload final
  const data = { ...base, programs };

  console.log("Dados recebidos (normalizados):", data);

  // 4) validação Zod
  const result = LicenseSchema.safeParse(data);
  if (!result.success) {
    console.error("Erro de validação:", result.error);
    return { success: false, error: "Dados inválidos" };
  }

  const supabase = createClient();

  // 5) insere como OBJETO (não formData)
  const { error } = await supabase.from("licenses").insert([result.data]);

  if (error) {
    console.error("Erro ao inserir no Supabase:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true };
}
