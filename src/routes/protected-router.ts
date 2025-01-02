import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { WorkoutController } from "../controllers/workout-controller";
import { CourseController } from "../controllers/course-controller";
import { UserController } from "../controllers/user-controller";
import { CommunityController } from "../controllers/community-controller";


export const protectedRouter = express.Router();

// Apply authentication middleware to all routes
protectedRouter.use(authMiddleware);


protectedRouter.delete("/api/logout", UserController.logout)

// Workout routes
protectedRouter.post("/api/workouts", WorkoutController.createWorkout);
protectedRouter.get("/api/workouts", WorkoutController.getAllWorkouts);
protectedRouter.get("/api/workouts/:workoutId", WorkoutController.getWorkout);
protectedRouter.put("/api/workouts/:workoutId", WorkoutController.updateWorkout);

// Course routes
protectedRouter.post("/api/courses", CourseController.createCourse);
protectedRouter.get("/api/courses", CourseController.getAllCourses);
protectedRouter.get("/api/courses/:courseId", CourseController.getCourse);
protectedRouter.put("/api/courses/:courseId", CourseController.updateCourse);

// Community routes
protectedRouter.post("/api/community", CommunityController.createCommunity);
protectedRouter.get("/api/community", CommunityController.getAllCommunities);
protectedRouter.get("/api/community/:communityId", CommunityController.getCommunity);
protectedRouter.put("/api/community/:communityId", CommunityController.updateCommunity);
