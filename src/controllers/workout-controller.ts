import { NextFunction, Response } from "express";
import { UserRequest } from "../types/user-request";
import { WorkoutCreateRequest } from "../models/workout-model";
import { WorkoutService } from "../services/workout-service";

export class WorkoutController {

    // Create a new workout
    static async createWorkout(req: UserRequest, res: Response, next: NextFunction) {
       try {
               const request: WorkoutCreateRequest = req.body as WorkoutCreateRequest;
               const response = await WorkoutService.createWorkout( request);
               res.status(201).json({data: response,})
             }  catch (error) {
               next(error);
            }
    }

    // Get all workouts for a user
    static async getAllWorkouts(   
        req:UserRequest,
        res:Response,
        next: NextFunction) {
        try {
                    const response = await WorkoutService.getAllWorkouts(req.user!);
                    res.status(200).json({
                        data:response,
                    })
                }
                catch (error) {
                    next(error);
                }
    }

    // Get a specific workout by its ID
    static async getWorkout(req: UserRequest, res: Response, next: NextFunction) {
        try {
                    const response = await WorkoutService.getWorkout(
                        req.user!
                        ,Number(req.params.workoutId)
                    );
                    res.status(200).json({
                        data:response,
                    })
                }
                catch (error) {
                    next(error);
                }
    }

    // Update an existing workout
    static async updateWorkout(req: UserRequest, res: Response, next: NextFunction) {
        try {
                const request: WorkoutCreateRequest = req.body as WorkoutCreateRequest;
                const response = await WorkoutService.updateWorkout(
                    req.user!, Number(req.params.course_id),request);
                res.status(201).json({
                    data: response,
                })
              }  catch (error) {
                next(error);
              }
    }
}
