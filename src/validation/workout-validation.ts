import { z, ZodType } from "zod";

export class WorkoutValidation {
    static readonly CREATE: ZodType = z.object({
        name_workout: z.string().min(1).max(250),
        detail_workout: z.string().min(1),
        workout_type: z.string().min(1),
        photo_workout: z.string().url(),
        workout_duration: z.number().positive(),
    });

    static readonly UPDATE: ZodType = z.object({
        name_workout: z.string().min(1).max(250).optional(),
        detail_workout: z.string().min(1).optional(),
        workout_type: z.string().min(1).optional(),
        photo_workout: z.string().url().optional(),
        workout_duration: z.number().positive().optional(),
    });
}

