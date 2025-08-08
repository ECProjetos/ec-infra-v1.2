import { z } from "zod";

export const PermissionGroupsBulkCreateSchema = z.object({
    asset_id: z.string(),
    groups: z.preprocess(
        (val) => {
            // Se vier string, faz o parse
            if (typeof val === "string") {
                try {
                    return JSON.parse(val);
                } catch {
                    return [];
                }
            }
            return val;
        },
        z.array(
            z.object({
                nome: z.string().min(1),
                permissoes: z.array(z.string()).min(1)
            })
        )
    ),
});


export const PermissionGroupSchema = z.object({
    group_id: z.string(),
    asset_id: z.string(),
    nome: z.string(),
    permissoes: z.array(z.string()),
    created_at: z.string(), // ou .datetime(), se preferir
});


export const PermissionGroupsArraySchema = z.array(PermissionGroupSchema);

export type PermissionGroupsType = z.infer<typeof PermissionGroupsArraySchema>