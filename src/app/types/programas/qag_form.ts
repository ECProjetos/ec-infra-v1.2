import { z } from 'zod';

export const formQualidadeDaAguaSuperficial = z.object({
    id: z.string(),
    // preenchido automatico pelo sistema
    user_id: z.string(),
    ativo_id: z.string(),
    //preenchido pelo usuario
    campanha_de_coleta: z.coerce.date(),
    periodicidade_da_analise: z.string(),

    // campos referentes laboratório (preenchido automaticamente) apartir do select laboratorio(selecionado pelo usuario)
    nome_laboratorio: z.string(),
    razao_social_laboratorio: z.string(),
    cnpj_laboratorio: z.string(),
    endereco_laboratorio: z.string(),
    responsavel_tecnico: z.string(),
    email: z.string(),
    contato: z.string(),

    resultados: z.array(z.object()),

    registros_fotograficos_sondas: z.array(z.instanceof(File)),
    registros_fotograficos_amostradores: z.array(z.instanceof(File)),
    registros_fotograficos_caixas_termicas: z.array(z.instanceof(File)),
    registros_fotograficos_outros: z.array(z.instanceof(File)).optional(),
    laudos: z.array(z.instanceof(File)),
    created_at: z.string(),
})

export const createFormQualidadeDaAguaSuperficial = formQualidadeDaAguaSuperficial.omit({
    id: true,
    created_at: true,
})

export type FormQualidadeDaAguaSuperficial = z.infer<typeof formQualidadeDaAguaSuperficial>;

export type CreateFormQualidadeDaAguaSuperficial = z.infer<typeof createFormQualidadeDaAguaSuperficial>;