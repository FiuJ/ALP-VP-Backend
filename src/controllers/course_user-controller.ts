import { NextFunction, Response } from "express";
import { UserRequest } from "../types/user-request";
import { CoursesUsersCreateRequest } from "../models/courses_user-model";
import { CoursesUsersService } from "../services/course_user-service";

export class CoursesUsersController {

    // Create a new course-user relation
    static async createCoursesUser(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: CoursesUsersCreateRequest = req.body as CoursesUsersCreateRequest;
            const response = await CoursesUsersService.createCoursesUser(req.user!, request);
            res.status(201).json({
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }

    // Get all course-user relations
    static async getAllCoursesUsers(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await CoursesUsersService.getAllCoursesUsers();
            res.status(200).json({
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }

    // Get a specific course-user by ID
    static async getCoursesUser(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await CoursesUsersService.getCoursesUserById(Number(req.params.courseUserId));
            res.status(200).json({
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }

    // Get all course-user relations for a specific UserId
    static async getAllCoursesUsersByUserId(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await CoursesUsersService.getAllCoursesUsersByUserId(Number(req.params.userId));
            res.status(200).json({
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }

    // Update a course-user relation
    static async updateCoursesUser(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: CoursesUsersCreateRequest = req.body as CoursesUsersCreateRequest;
            const response = await CoursesUsersService.updateCoursesUser(Number(req.params.courseUserId), request);
            res.status(200).json({
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }

    // Delete a course-user relation
    static async deleteCoursesUser(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await CoursesUsersService.deleteCoursesUser(Number(req.params.courseUserId));
            res.status(200).json({
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }
}
