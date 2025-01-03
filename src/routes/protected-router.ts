import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { WorkoutController } from "../controllers/workout-controller";
import { CourseController } from "../controllers/course-controller";
import { UserController } from "../controllers/user-controller";
import { CommunityController } from "../controllers/community-controller";
import { CommentController } from "../controllers/comment-controller";
import { PostController } from "../controllers/post-controller";


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

// Comment routes
protectedRouter.post("/api/comments", CommentController.createComment);
protectedRouter.get("/api/comments", CommentController.getAllComments);

// Post routes
protectedRouter.post("/api/post", PostController.createPost);
protectedRouter.get("/api/post", PostController.getAllPosts);
protectedRouter.get("/api/post/:postId", PostController.getPost);
protectedRouter.put("/api/post/:postId", PostController.updatePost);
protectedRouter.delete("/api/post/:postId", PostController.deletePost);
protectedRouter.get("/api/post/user/:userId", PostController.getAllPostsByUser);
protectedRouter.get("/api/post/public", PostController.getAllPostIsPublic);
