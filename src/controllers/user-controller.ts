import { NextFunction, Request, Response } from "express";
import { LoginUserRequest, RegisterUserRequest, userResponse } from "../models/user-model";
import { UserService } from "../services/auth-service";
import { UserRequest } from "../types/user-request";

export class UserController{
    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const request: RegisterUserRequest = req.body as RegisterUserRequest
            const response: userResponse = await UserService.register(request)

            res.status(200).json({
                data: response
            })
            
        } catch (error) {
            // ini pass error ke middleware
            next(error)
            
        }

    }

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const request: LoginUserRequest = req.body as LoginUserRequest
            const response: userResponse = await UserService.login(request)

            res.status(200).json({
                data: response
            })
            
        } catch (error) {
            // ini pass error ke middleware
            next(error)
        }

    }

    static async logout(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await UserService.logout(req.user!)

            res.status(200).json({
                data: response
            })
            
        } catch (error) {
            // ini pass error ke middleware
            next(error)
        }

    }
}