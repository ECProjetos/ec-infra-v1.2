import { z } from "zod";


export const ResponsaveisSchema = z.object({
    name: z.string(),
    graduation: z.string(),
    register: z.string(),

})
export const LaboratorioSchema = z.object({
    id: z.string().optional(),
    asset_id: z.string(),
    name: z.string(),
    legal_name: z.string(),
    cnpj: z.string(),
    email: z.string(),
    description: z.string(),
    contact: z.string(),
    public_place: z.string(),
    number: z.string().optional(),
    zip_code: z.string(),
    city: z.string(),
    uf: z.string().length(2),
    responsables: z.array(ResponsaveisSchema)
});



export type LaboratorioType = z.infer<typeof LaboratorioSchema>