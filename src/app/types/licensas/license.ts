import { z } from 'zod'

export const LicenseSchema = z.object({
    id: z.string().optional(),
    asset_id: z.string(),
    number: z.string(),
    organ: z.string(),
    emission_date: z.string(),
    due_date: z.string(),
    programs: z.array(z.string())

})

export const LicenseSchemaArray = z.array(LicenseSchema)

export type LicenseSchemaArrayType = z.infer<typeof LicenseSchemaArray>
export type LicenseSchemaType = z.infer<typeof LicenseSchema>