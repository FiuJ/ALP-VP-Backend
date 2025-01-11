import { z, ZodType } from "zod";

export class UserCommunityValidation {
    static readonly CREATE: ZodType = z.object({
        community_id: z.number().positive(),
    })
}