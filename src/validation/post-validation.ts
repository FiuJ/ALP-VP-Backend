import { z, ZodType } from "zod";

export class PostValidation {
    static readonly CREATE: ZodType = z.object({
        post_name: z.string().min(1).max(250),
        post_description: z.string().min(1).max(10000),
        post_photo: z.string(),
        post_date: z.string(),
        post_likes: z.number(),
        user_id: z.number(),
        isPublic: z.boolean()
    });

    static readonly UPDATE: ZodType = z.object({
        post_name: z.string().min(1).max(250),
        post_description: z.string().min(1).max(10000),
        post_photo: z.string(),
        isPublic: z.boolean()
    });

}

