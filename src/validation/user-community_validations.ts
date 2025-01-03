import { z, ZodType } from "zod";

export class UserCommunityValidation {
    static readonly CREATE: ZodType = z.object({
        user_id: z.number().positive(),
        community_id: z.number().positive(),
    })
}