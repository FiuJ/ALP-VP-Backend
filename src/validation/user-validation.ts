import { z, ZodType } from "zod";

export class UserValidation {
    static readonly REGISTER: ZodType = z.object({
        username: z.string()
            .min(1, "Username is required")
            .max(250, "Username must be at most 250 characters"),
        email: z.string()
            .email("Invalid email format")
            .max(250, "Email must be at most 250 characters"),
        password: z.string()
            .min(8, "Password must be at least 8 characters")
            .max(250, "Password must be at most 250 characters"),
    });

    static readonly LOGIN: ZodType = z.object({
        email: z.string()
            .email("Invalid email format")
            .max(250, "Email must be at most 250 characters"),
        password: z.string()
            .min(1, "Password is required")
            .max(250, "Password must be at most 250 characters"),
    });

    // static readonly UPDATE_PROFILE: ZodType = z.object({
    //     username: z.string()
    //         .min(1, "Username is required")
    //         .max(250, "Username must be at most 250 characters")
    //         .optional(),
    //     email: z.string()
    //         .email("Invalid email format")
    //         .max(250, "Email must be at most 250 characters")
    //         .optional(),
    //     password: z.string()
    //         .min(8, "Password must be at least 8 characters")
    //         .max(250, "Password must be at most 250 characters")
    //         .optional(),
    //     photo_workout: z.string()
    //         .url("Invalid URL format")
    //         .optional(),
    // });

    // static readonly PERFORMANCE_UPDATE: ZodType = z.object({
    //     course_counter: z.number()
    //         .nonnegative("Course counter must be a non-negative number"),
    //     performance: z.number()
    //         .nonnegative("Performance must be a non-negative number"),
    // });
}
