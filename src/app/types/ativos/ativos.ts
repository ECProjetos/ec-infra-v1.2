import { z } from "zod"

export const AtivoCreationSchema = z.object({
    name: z.string(),
    uf: z.string(),
    city: z.string(),
    description: z.string(),
    url: z.string()
})

export type AtivoCreationType = z.infer<typeof AtivoCreationSchema>