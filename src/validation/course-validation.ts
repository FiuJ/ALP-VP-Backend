import { z, ZodType } from "zod";

export class CourseValidation {
    static readonly CREATE: ZodType = z.object({
        detail_course: z.string().min(1).max(250),
        photo_course: z.string().url(),
        course_duration: z.number().positive(),
        community_id: z.number().positive(),
    });

    static readonly UPDATE: ZodType = z.object({
        detail_course: z.string().min(1).max(250).optional(),
        photo_course: z.string().url().optional(),
        course_duration: z.number().positive().optional(),
        community_id: z.number().positive().optional(),
    });
}