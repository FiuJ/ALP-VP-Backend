import { CoursesUsersCreateRequest, CoursesUsersResponse, Courses_UsersResponseList, toCourses_UsersResponse } from "../models/courses_user-model";
import { Validation } from "../validation/validation";
import { CourseUserValidation } from "../validation/course_user-validation";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { Users } from "@prisma/client";

export class CoursesUsersService {

    // Create a new course-user relation
    static async createCoursesUser(
        user: Users,
        req: CoursesUsersCreateRequest
    ): Promise<string> {
        const coursesUserRequest = Validation.validate(
            CourseUserValidation.CREATE,
            req
        );

        await prismaClient.courses_Users.create({
            data: {
                isDone: coursesUserRequest.isDone,
                user_id: coursesUserRequest.user_id,
                course_id: coursesUserRequest.course_id
            }
        });

        return "Course-User relation created successfully";
    }

    // Get all course-user relations
    static async getAllCoursesUsers(): Promise<CoursesUsersResponse[]> {
        const coursesUsers = await prismaClient.courses_Users.findMany();
        return Courses_UsersResponseList(coursesUsers);
    }

    // Get a specific course-user by ID
    static async getCoursesUserById(
        courseUserId: number
    ): Promise<CoursesUsersResponse> {
        const coursesUser = await prismaClient.courses_Users.findUnique({
            where: { course_user_id: courseUserId }
        });

        if (!coursesUser) {
            throw new ResponseError(400, "Course-User relation not found");
        }

        return toCourses_UsersResponse(coursesUser);
    }

    // Get all course-user relations for a specific UserId
    static async getAllCoursesUsersByUserId(userId: number): Promise<CoursesUsersResponse[]> {
        // Validate the input userId
        if (!userId || userId <= 0) {
            throw new ResponseError(400, "Invalid user ID");
        }
        // Fetch course-user relations from the database
        const coursesUsers = await prismaClient.courses_Users.findMany({
            where: {
                user_id: userId
            }
        });

        // If no data found, throw an error
        if (coursesUsers.length === 0) {
            throw new ResponseError(404, "No course-user relations found for the given user ID");
        }

        // Convert and return the response
        return Courses_UsersResponseList(coursesUsers);
    }

    // Update a course-user relation
    static async updateCoursesUser(
        courseUserId: number,
        req: CoursesUsersCreateRequest
    ): Promise<string> {
        const coursesUserRequest = Validation.validate(
            CourseUserValidation.UPDATE,
            req
        );

        const existingCoursesUser = await prismaClient.courses_Users.findUnique({
            where: { course_user_id: courseUserId }
        });

        if (!existingCoursesUser) {
            throw new ResponseError(400, "Course-User relation not found");
        }

        await prismaClient.courses_Users.update({
            where: { course_user_id: courseUserId },
            data: {
                isDone: coursesUserRequest.isDone,
                user_id: coursesUserRequest.user_id,
                course_id: coursesUserRequest.course_id
            }
        });

        return "Course-User relation updated successfully";
    }

    // Delete a course-user relation
    static async deleteCoursesUser(courseUserId: number): Promise<string> {
        const coursesUser = await prismaClient.courses_Users.findUnique({
            where: { course_user_id: courseUserId }
        });

        if (!coursesUser) {
            throw new ResponseError(400, "Course-User relation not found");
        }

        await prismaClient.courses_Users.delete({
            where: { course_user_id: courseUserId }
        });

        return "Course-User relation deleted successfully";
    }
}
