import { z, ZodType } from "zod";

export class PostValidation {
    static readonly CREATE: ZodType = z.object({
        post_name: z.string().min(1).max(250),
        post_description: z.string().min(1).max(10000),
        post_photo: z.string().url(),
        post_date: z.date(),
        post_like: z.number().positive(),
        post_isLike: z.boolean(),
        user_id: z.number().positive(),
        isPublic: z.boolean()
    });

    static readonly UPDATE: ZodType = z.object({
        post_name: z.string().min(1).max(250),
        post_description: z.string().min(1).max(10000),
        post_photo: z.string().url(),
        post_date: z.date(),
        post_like: z.number().positive(),
        post_isLike: z.boolean(),
        user_id: z.number().positive(),
        isPublic: z.boolean()
    });

}

