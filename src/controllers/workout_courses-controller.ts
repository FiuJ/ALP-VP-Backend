import { NextFunction, Response } from "express";
import { UserRequest } from "../types/user-request";
import { WorkoutCoursesCreateRequest } from "../models/workout_courses-model";
import { WorkoutCoursesService } from "../services/workout_courses-service";
import { ResponseError } from "../error/response-error";

export class WorkoutCoursesController {

    // Create a new workout-course relation
    static async createWorkoutCourse(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: WorkoutCoursesCreateRequest = req.body as WorkoutCoursesCreateRequest;
            const response = await WorkoutCoursesService.createWorkoutCourse(req.user!, request);
            res.status(201).json({ data: response });
        } catch (error) {
            next(error);
        }
    }

    // Get all workout-course relations
    static async getAllWorkoutCourses(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await WorkoutCoursesService.getAllWorkoutCourses();
            res.status(200).json({ data: response });
        } catch (error) {
            next(error);
        }
    }

    // Get a specific workout-course by ID
    static async getWorkoutCourse(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await WorkoutCoursesService.getWorkoutCourseById(Number(req.params.workoutCourseId));
            res.status(200).json({ data: response });
        } catch (error) {
            next(error);
        }
    }

    // Get all workout-course relations for a specific course ID
    static async getAllWorkoutCourseByCourseId(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const courseId = Number(req.params.courseId);
            const response = await WorkoutCoursesService.getAllWorkoutCoursebyCourseId(courseId);
            res.status(200).json({ data: response });
        } catch (error) {
            next(error);
        }
    }

    // Update a workout-course relation
    static async updateWorkoutCourse(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: WorkoutCoursesCreateRequest = req.body as WorkoutCoursesCreateRequest;
            const response = await WorkoutCoursesService.updateWorkoutCourse(
                Number(req.params.workoutCourseId),
                request
            );
            res.status(200).json({ data: response });
        } catch (error) {
            next(error);
        }
    }

    // Delete a workout-course relation
    static async deleteWorkoutCourse(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await WorkoutCoursesService.deleteWorkoutCourse(Number(req.params.workoutCourseId));
            res.status(200).json({ data: response });
        } catch (error) {
            next(error);
        }
    }
}
