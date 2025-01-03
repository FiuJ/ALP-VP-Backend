import { z, ZodType } from "zod";

export class CommentValidation {
    static readonly CREATE: ZodType = z.object({
        comment: z.string().min(1),
        comment_date: z.date(),
        user_id: z.number().positive(),
        post_id: z.number().positive(),
    });

}