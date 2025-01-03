import { z, ZodType } from "zod";

export class CourseUserValidation {
    static readonly CREATE: ZodType = z.object({
        isDone: z.boolean(),
        user_id: z.number().positive(),
        course_id: z.number().positive(),
    });

    static readonly UPDATE: ZodType = z.object({
        isDone: z.boolean().optional(),
        user_id: z.number().positive().optional(),
        course_id: z.number().positive().optional(),
    });
}
