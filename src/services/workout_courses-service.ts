import { WorkoutCoursesCreateRequest, WorkoutCoursesResponse, Workout_CoursesResponseList, toWorkout_CoursesResponse } from "../models/workout_courses-model";
import { Validation } from "../validation/validation";
import { WorkoutCourseValidation } from "../validation/workout_courses-validation";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { Users } from "@prisma/client";

export class WorkoutCoursesService {

    // Create a new workout-course relation
    static async createWorkoutCourse(
        req: WorkoutCoursesCreateRequest
    ): Promise<string> {
        const workoutCourseRequest = Validation.validate(
            WorkoutCourseValidation.CREATE,
            req
        );

        await prismaClient.workouts_courses.create({
            data: {
                day: workoutCourseRequest.day,
                workout_id: workoutCourseRequest.workout_id,
                course_id: workoutCourseRequest.course_id
            }
        });

        return "Workout-Course relation created successfully";
    }

    // Get all workout-course relations
    static async getAllWorkoutCourses(): Promise<WorkoutCoursesResponse[]> {
        const workoutCourses = await prismaClient.workouts_courses.findMany();
        return Workout_CoursesResponseList(workoutCourses);
    }

    // Get a specific workout-course by ID
    static async getWorkoutCourseById(
        workoutCourseId: number
    ): Promise<WorkoutCoursesResponse> {
        const workoutCourse = await prismaClient.workouts_courses.findUnique({
            where: { workout_course_id: workoutCourseId }
        });

        if (!workoutCourse) {
            throw new ResponseError(400, "Workout-Course relation not found");
        }

        return toWorkout_CoursesResponse(workoutCourse);
    }

    // Get all workout-course relations for a specific CourseId
    static async getAllWorkoutCoursebyCourseId(courseId: number): Promise<WorkoutCoursesResponse[]> {
        // Validate the input courseId
        if (!courseId || courseId <= 0) {
            throw new ResponseError(400, "Invalid course ID");
        }
        // Fetch workout-course relations from the database
        const workoutCourses = await prismaClient.workouts_courses.findMany({
            where: {
                course_id: courseId
            }
        });

        // If no data found, throw an error
        if (workoutCourses.length === 0) {
            throw new ResponseError(404, "No workout-course relations found for the given course ID");
        }

        // Convert and return the response
        return Workout_CoursesResponseList(workoutCourses);
    }
    

    // Update a workout-course relation
    static async updateWorkoutCourse(
        workoutCourseId: number,
        req: WorkoutCoursesCreateRequest
    ): Promise<string> {
        const workoutCourseRequest = Validation.validate(
            WorkoutCourseValidation.UPDATE,
            req
        );

        const existingWorkoutCourse = await prismaClient.workouts_courses.findUnique({
            where: { workout_course_id: workoutCourseId }
        });

        if (!existingWorkoutCourse) {
            throw new ResponseError(400, "Workout-Course relation not found");
        }

        await prismaClient.workouts_courses.update({
            where: { workout_course_id: workoutCourseId },
            data: {
                day: workoutCourseRequest.day,
                workout_id: workoutCourseRequest.workout_id,
                course_id: workoutCourseRequest.course_id
            }
        });

        return "Workout-Course relation updated successfully";
    }

    // Delete a workout-course relation
    static async deleteWorkoutCourse(workoutCourseId: number): Promise<string> {
        const workoutCourse = await prismaClient.workouts_courses.findUnique({
            where: { workout_course_id: workoutCourseId }
        });

        if (!workoutCourse) {
            throw new ResponseError(400, "Workout-Course relation not found");
        }

        await prismaClient.workouts_courses.delete({
            where: { workout_course_id: workoutCourseId }
        });

        return "Workout-Course relation deleted successfully";
    }
}
