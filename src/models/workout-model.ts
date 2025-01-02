import { Workouts } from "@prisma/client";

export interface WorkoutCreateRequest {
    name_workout: string;
    detail_workout: string;
    workout_type: string;
    photo_workout: string;
    workout_duration: number;
}

export interface WorkoutResponse {
    workout_id: number;
    name_workout: string;
    detail_workout: string;
    workout_type: string;
    photo_workout: string;
    workout_duration: number;
}

export function WorkoutResponseList(workouts: Workouts[]): WorkoutResponse[] {
    // Map the data from Workouts to WorkoutResponse
    const result = workouts.map((data) => {
        return {
            workout_id: data.workout_id,
            name_workout: data.name_workout,
            detail_workout: data.detail_workout,
            workout_type: data.workout_type,
            photo_workout: data.photo_workout,
            workout_duration: data.workout_duration,
        };
    });
    return result;
}

// Function to transform a single workout to WO Response
export function toCourseResponse(workout: Workouts): WorkoutResponse {
    return {
        workout_id: workout.workout_id,
        name_workout: workout.name_workout,
        detail_workout: workout.detail_workout,
        workout_type: workout.workout_type,
        photo_workout: workout.photo_workout,
        workout_duration: workout.workout_duration,
    };
}



