import { z } from "zod"

export const ProgramSchema = z.object({
    id: z.string().optional(),
    asset_id: z.string(),
    license_id: z.string(),
    name: z.string(),
    code: z.string(),
    description: z.string(),
    metodology: z.string(),
    sample_type: z.string(),
    sample_shower: z.string(),
    container_type: z.string(),
    container_moving: z.string(),

})

