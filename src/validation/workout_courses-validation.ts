import { z, ZodType } from "zod";


export class WorkoutCourseValidation {
    static  readonly CREATE: ZodType = z.object({
        day: z.number().min(1, "Day must be a positive number"),
        workout_id: z.number().int().positive("Workout ID must be a positive integer"),
        course_id: z.number().int().positive("Course ID must be a positive integer"),
    });

    static  readonly UPDATE: ZodType = z.object({
        day: z.number().min(1, "Day must be a positive number").optional(),
        workout_id: z.number().int().positive("Workout ID must be a positive integer").optional(),
        course_id: z.number().int().positive("Course ID must be a positive integer").optional(),
    });
    
}