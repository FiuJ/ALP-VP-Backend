import { Workouts } from "@prisma/client";
import { Users } from "@prisma/client";

import { toCourseResponse, WorkoutCreateRequest, WorkoutResponse, WorkoutResponseList } from "../models/workout-model";
import { WorkoutValidation } from "../validation/workout-validation";
import { Validation } from "../validation/validation";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";

export class WorkoutService {

    // Create a new workout
    static async createWorkout(
        req: WorkoutCreateRequest
    ): Promise<string> {
        // Validate the request data using the WorkoutValidation
        const workoutRequest = Validation.validate(
            WorkoutValidation.CREATE,
            req
        );
    
        // Add workout data to the database
        await prismaClient.workouts.create({
            data: {
                name_workout: workoutRequest.name_workout,
                detail_workout: workoutRequest.detail_workout,
                workout_type: workoutRequest.workout_type,
                photo_workout: workoutRequest.photo_workout,
                workout_duration: workoutRequest.workout_duration
            }
        });
    
        return "Workout created successfully";
    }
    

    // Get all workouts
    static async getAllWorkouts(user: Users): Promise<WorkoutResponse[]> {
        const workouts = await prismaClient.workouts.findMany();
        return WorkoutResponseList(workouts);
    }

    // Get a specific workout by ID
    static async getWorkout(user: Users, workoutId: number): Promise<WorkoutResponse> {
        const workout = await prismaClient.workouts.findUnique({
            where: {
                workout_id: workoutId,
            },
        });
        
        if (!workout) {
            throw new ResponseError(400, "Workout not found");
        }

        return toCourseResponse(workout);
    }

    static async updateWorkout(user: Users, workoutId: number, req: WorkoutCreateRequest): Promise<string> {
        const workoutUpdateRequest = Validation.validate(
            WorkoutValidation.CREATE,
            req
        );

        const workout = await prismaClient.workouts.findUnique({
            where: {
                workout_id: workoutId,
            }
        });

        if (!workout) {
            throw new ResponseError(400, "Workout not found");
        }

        await prismaClient.workouts.update({
            where: {
                workout_id: workoutId,
            },
            data: {
                name_workout: workoutUpdateRequest.name_workout,
                detail_workout: workoutUpdateRequest.detail_workout,
                workout_type: workoutUpdateRequest.workout_type,
                photo_workout: workoutUpdateRequest.photo_workout,
                workout_duration: workoutUpdateRequest.workout_duration
            }
        });

        return "Workout updated successfully";
    }

    // Delete a workout by ID
    static async deleteWorkout(workoutId: number): Promise<string> {
        const workout = await prismaClient.workouts.findUnique({
            where: {
                workout_id: workoutId,
            }
        });

        if (!workout) {
            throw new ResponseError(400, "Workout not found");
        }

        await prismaClient.workouts.delete({
            where: {
                workout_id: workoutId,
            }
        });

        return "Workout deleted successfully";
    }
}


