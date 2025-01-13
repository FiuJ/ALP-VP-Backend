import express from "express"
import { UserController } from "../controllers/user-controller"
import { WorkoutController } from "../controllers/workout-controller"
import { CourseController } from "../controllers/course-controller"
import { WorkoutCoursesController } from "../controllers/workout_courses-controller"
import { CommunityController } from "../controllers/community-controller"

export const publicRouter = express.Router()

publicRouter.post("/api/register", UserController.register)
publicRouter.post("/api/login", UserController.login)


//create 
publicRouter.post("/api/workouts", WorkoutController.createWorkout);
publicRouter.post("/api/courses", CourseController.createCourse);
publicRouter.post("/api/workout-courses", WorkoutCoursesController.createWorkoutCourse); 
publicRouter.post("/api/community", CommunityController.createCommunity);


publicRouter.post("/api/emergency-logout", UserController.emergencyLogout);
