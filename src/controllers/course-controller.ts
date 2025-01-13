import { NextFunction, Response } from "express";
import { UserRequest } from "../types/user-request";
import { CourseCreateRequest } from "../models/course-model";
import { CourseService } from "../services/course-service";

export class CourseController {

    static async createCourse(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: CourseCreateRequest = req.body as CourseCreateRequest;
            const response = await CourseService.createCourse(request);
            res.status(201).json({ data: response, })
        } catch (error) {
            next(error);
        }
    }

    static async getAllCourses(
        req: UserRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const response = await CourseService.getAllCourses(req.user!);
            res.status(200).json({
                data: response,
            })
        }
        catch (error) {
            next(error);
        }
    }

    static async getCourse(
        req: UserRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            console.log("Received courseId:", req.params.course_id);
            const response = await CourseService.getCourse(
                req.user!
                , Number(req.params.courseId)
            );
            res.status(200).json({
                data: response,
            })
        }
        catch (error) {
            next(error);
        }
    }

    static async updateCourse(
        req: UserRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const request: CourseCreateRequest = req.body as CourseCreateRequest;
            const response = await CourseService.updateCourse(req.user!, Number(req.params.course_id), request);
            res.status(201).json({
                data: response,
            })
        } catch (error) {
            next(error);
        }
    }

}
