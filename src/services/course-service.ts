import { Users } from "@prisma/client";
import { CourseCreateRequest, CourseResponse, CourseResponseList, toCourseResponse } from "../models/course-model";
import { CourseValidation } from "../validation/course-validation";
import { Validation } from "../validation/validation";
import { prismaClient } from "../application/database";
import {ResponseError} from "../error/response-error"

export class CourseService {

    // Create a new course
    static async createCourse(
        user: Users, // The user creating the course
        req: CourseCreateRequest // The course creation request data
    ): Promise<string> {
        const courseRequest = Validation.validate(
            CourseValidation.CREATE,
            req
        );

        // Add the course to the database
        await prismaClient.courses.create({
            data: {
                detail_course: courseRequest.detail_course,
                photo_course: courseRequest.photo_course,
                course_duration: courseRequest.course_duration,
                community_id: courseRequest.community_id
            }
        });

        return "Course created successfully";
    }

    // Get all courses created by the user
    static async getAllCourses(user: Users): Promise<CourseResponse[]> {
        // Fetch all courses from the database
        const courses = await prismaClient.courses.findMany({
            // No specific conditions, so it gets all courses available
        });
    
        // Return the list of courses transformed into the CourseResponse format
        return CourseResponseList(courses); 
    }

    // Get a single course by its ID
    static async getCourse(user: Users, courseId: number): Promise<CourseResponse> {
        const course = await prismaClient.courses.findUnique({
            where: {
                course_id: courseId
            }
        });

        if (!course) {
            throw new ResponseError(400, "Course not found");
        }

        return toCourseResponse(course); // Transform single course data to response format
    }

    // Update an existing course
    static async updateCourse(
        user: Users,
        courseId: number,
        req: CourseCreateRequest
    ): Promise<string> {
        const courseUpdateRequest = Validation.validate(
            CourseValidation.CREATE,
            req
        );

        const course = await prismaClient.courses.findUnique({
            where: {
                course_id: courseId
            }
        });

        if (!course) {
            throw new ResponseError(400, "Course not found");
        }

        // Update the course in the database
        await prismaClient.courses.update({
            where: {
                course_id: courseId
            },
            data: {
                detail_course: courseUpdateRequest.detail_course,
                photo_course: courseUpdateRequest.photo_course,
                course_duration: courseUpdateRequest.course_duration,
                community_id: courseUpdateRequest.community_id
            }
        });

        return "Course updated successfully";
    }
}
