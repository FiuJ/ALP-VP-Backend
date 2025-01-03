import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { WorkoutController } from "../controllers/workout-controller";
import { CourseController } from "../controllers/course-controller";
import { UserController } from "../controllers/user-controller";
import { CommunityController } from "../controllers/community-controller";
import { CommentController } from "../controllers/comment-controller";
import { PostController } from "../controllers/post-controller";
import { WorkoutCoursesController } from "../controllers/workout_courses-controller";
import { CoursesUsersController } from "../controllers/course_user-controller";
import { UserCommunityController } from "../controllers/user-community-controller";


export const protectedRouter = express.Router();

// Apply authentication middleware to all routes
protectedRouter.use(authMiddleware);


protectedRouter.delete("/api/logout", UserController.logout)

// Course-User routes
protectedRouter.post("/api/courses-users", CoursesUsersController.createCoursesUser); // Create a new course-user relation
protectedRouter.get("/api/courses-users", CoursesUsersController.getAllCoursesUsers); // Get all course-user relations
protectedRouter.get("/api/courses-users/:courseUserId", CoursesUsersController.getCoursesUser); // Get a specific course-user by ID
protectedRouter.get("/api/courses-users/user/:userId", CoursesUsersController.getAllCoursesUsersByUserId); // Get all course-user relations for a specific user
protectedRouter.put("/api/courses-users/:courseUserId", CoursesUsersController.updateCoursesUser); // Update a course-user relation
protectedRouter.delete("/api/courses-users/:courseUserId", CoursesUsersController.deleteCoursesUser); // Delete a course-user relation


// Workout-Courses routes
protectedRouter.post("/api/workout-courses", WorkoutCoursesController.createWorkoutCourse); // Create a new workout-course relation
protectedRouter.get("/api/workout-courses", WorkoutCoursesController.getAllWorkoutCourses); // Get all workout-course relations
protectedRouter.get("/api/workout-courses/:workoutCourseId", WorkoutCoursesController.getWorkoutCourse); // Get a specific workout-course by ID
protectedRouter.get("/api/workout-courses/course/:courseId", WorkoutCoursesController.getAllWorkoutCourseByCourseId); // Get workout-course relations by course ID
protectedRouter.put("/api/workout-courses/:workoutCourseId", WorkoutCoursesController.updateWorkoutCourse); // Update a workout-course relation
protectedRouter.delete("/api/workout-courses/:workoutCourseId", WorkoutCoursesController.deleteWorkoutCourse); // Delete a workout-course relation

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
protectedRouter.get("/api/community/user/:userId", CommunityController.getAllCommunitiesByUserId);

// Comment routes
protectedRouter.post("/api/comments", CommentController.createComment);
protectedRouter.get("/api/comments", CommentController.getAllComments);
protectedRouter.get("/api/comments/post/:postId", CommentController.getAllCommentsByPostId);

// Post routes
protectedRouter.post("/api/post", PostController.createPost);
protectedRouter.get("/api/post", PostController.getAllPosts);
protectedRouter.get("/api/post/:postId", PostController.getPost);
protectedRouter.put("/api/post/:postId", PostController.updatePost);
protectedRouter.delete("/api/post/:postId", PostController.deletePost);
protectedRouter.get("/api/post/user/:userId", PostController.getAllPostsByUser);
protectedRouter.get("/api/post/public", PostController.getAllPostIsPublic);

// User-Community routes
protectedRouter.post("/api/user-community", UserCommunityController.createUserCommunity);
protectedRouter.get("/api/user-community", UserCommunityController.getAllUserCommunities);
protectedRouter.get("/api/user-community/:userCommunityId", UserCommunityController.getUserCommunityById);
protectedRouter.delete("/api/user-community/:userCommunityId", UserCommunityController.deleteUserCommunityById);



