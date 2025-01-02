import { NextFunction, Response } from "express";
import { UserRequest } from "../types/user-request";
import { WorkoutCreateRequest } from "../models/workout-model";
import { WorkoutService } from "../services/workout-service";

export class WorkoutController {

    // Create a new workout
    static async createWorkout(req: UserRequest, res: Response, next: NextFunction) {
        try {
            if (!req.user) {
                return res.status(401).json({ message: "User not authenticated" });
            }

            const request: WorkoutCreateRequest = req.body as WorkoutCreateRequest;
            const response = await WorkoutService.createWorkout(req.user!, request);
            res.status(201).json({ data: response });
        } catch (error) {
            next(error);
        }
    }

    // Get all workouts for a user
    static async getAllWorkouts(req: UserRequest, res: Response, next: NextFunction) {
        try {
            if (!req.user) {
                return res.status(401).json({ message: "User not authenticated" });
            }

            const response = await WorkoutService.getAllWorkouts(req.user);
            res.status(200).json({ data: response });
        } catch (error) {
            next(error);
        }
    }

    // Get a specific workout by its ID
    static async getWorkout(req: UserRequest, res: Response, next: NextFunction) {
        try {
            if (!req.user) {
                return res.status(401).json({ message: "User not authenticated" });
            }

            const response = await WorkoutService.getWorkout(req.user, Number(req.params.workout_id));
            if (!response) {
                return res.status(404).json({ message: "Workout not found" });
            }
            res.status(200).json({ data: response });
        } catch (error) {
            next(error);
        }
    }

    // Update an existing workout
    static async updateWorkout(req: UserRequest, res: Response, next: NextFunction) {
        try {
            if (!req.user) {
                return res.status(401).json({ message: "User not authenticated" });
            }

            const request: WorkoutCreateRequest = req.body as WorkoutCreateRequest;
            const response = await WorkoutService.updateWorkout(req.user, Number(req.params.workout_id), request);
            if (!response) {
                return res.status(404).json({ message: "Workout not found" });
            }
            res.status(200).json({ data: response });
        } catch (error) {
            next(error);
        }
    }
}
