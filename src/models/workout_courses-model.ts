import { Workouts_courses } from "@prisma/client";

export interface WorkoutCoursesCreateRequest {
    day: number;
    workout_id: number;
    course_id: number;
}

export interface WorkoutCoursesResponse {
    course_workout_id: number;
    day: number;
    workout_id: number;
    course_id: number;
    name: string;
}

export function Workout_CoursesResponseList(workoutcourses: Workouts_courses[]): WorkoutCoursesResponse[] {
    const result = workoutcourses.map((data) => ({
        course_workout_id: data.workout_course_id,
        day: data.day,
        workout_id: data.workout_id,
        course_id: data.course_id,
        name: "",
    }));
    
return result;
}


export function toWorkout_CoursesResponse(workoutcourses: Workouts_courses): WorkoutCoursesResponse {
    return {
        course_workout_id: workoutcourses.workout_course_id,
        day: workoutcourses.day,
        workout_id: workoutcourses.workout_id,
        course_id: workoutcourses.course_id,
        name: "",
    }
}