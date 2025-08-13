import { z } from "zod";

export type PointsLocationRow = {
    ponto: string,
    utm_n_m: number,
    utm_e_m: number,
    classe_uso_da_agua: string,
};

export type PeriodicityRow = {
    grupo: string,
    parametro: string,
    periodicidade: string
};

const PointsLocationSchema = z.object({
    ponto: z.string(),
    utm_n_m: z.number(),
    utm_e_m: z.number(),
    classe_uso_da_agua: z.string(),
});

const PeriodicitySchema = z.object({
    grupo: z.string(),
    parametro: z.string(),
    periodicidade: z.string(),
});

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
    points_location: z.array(PointsLocationSchema),
    periodicity_parameters: z.array(PeriodicitySchema),
});
export type ProgramInput = z.infer<typeof ProgramSchema>;
