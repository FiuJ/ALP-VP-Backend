import { z, ZodType } from "zod";

export class CommentValidation {
    static readonly CREATE: ZodType = z.object({
        comment: z.string().min(1),
        comment_date: z.string(),
        post_id: z.number().positive(),
    });

}