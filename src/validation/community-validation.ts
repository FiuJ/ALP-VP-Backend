import { z, ZodType } from "zod";

export class CommunityValidation {
    static readonly CREATE: ZodType = z.object({
        name: z.string().min(1).max(250),
        description: z.string().min(1),
        photo: z.string(),
    });

    static readonly UPDATE: ZodType = z.object({
        name: z.string().min(1).max(250).optional(),
        description: z.string().min(1).optional(),
        photo: z.string().optional(),
    });
}